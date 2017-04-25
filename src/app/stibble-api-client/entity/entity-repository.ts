import { Response } from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {
  KEY_ENTITY,
  KEY_EXPAND,
  KEY_HYDRA_ITEMS,
  KEY_HYDRA_TOTAL_ITEMS,
  KEY_ORDER,
  KEY_PARENT
  } from './../client/client-constants';
import { Entity } from './entity';
import { EntityFieldFlags as Flag, EntityFieldMetadata } from './entity-metadata';
import { EntityMetadataProvider } from './entity-metadata-provider';
import { FindAllParameters, FindParameters } from './entity-parameters';
import { Gateway } from './gateway';
import { Repository } from './repository';

export class EntityRepository<T extends Entity> implements Repository<T> {

  constructor(
    private _type: { new (): T; },
    private _gateway: Gateway
  ) { }

  // -----------------------------------------------------------------------------------------------
  // PUBLIC METHODS
  // -----------------------------------------------------------------------------------------------

  create(entity: T): Observable<T> {
    const result = this._processBeforeCreate(entity);

    if (!result.isValid()) {
      return Observable.throw(`Cannot create '${this._name()}': ${result.errors.join(', ')}`);
    }

    return this._gateway.create(result.filteredData)
      .map(this._extractEntity);
  }

  delete(entity: T): Observable<string> {
    return this.deleteById(entity.id);
  }

  deleteById(id: string): Observable<string> {
    if (!id) {
      return Observable.throw(`Cannot delete '${this._name()}': 'id' is invalid`);
    }

    return this._gateway.delete(id)
      .map(response => id);
  }

  find(id: string, params?: FindParameters): Observable<T> {
    return this._gateway.find(id, this._prepareParams(params))
      .map(this._extractEntity);
  }

  findAll(params?: FindAllParameters): Observable<Array<T>> {
    return this._gateway.findAll(this._prepareParams(params))
      .map(this._extractEntities);
  }

  findByParent(parentId: string, params?: FindAllParameters): Observable<Array<T>> {
    const metadata = EntityMetadataProvider.getFieldMetadata(this._type, KEY_PARENT);

    if (!metadata) {
      console.warn(`Entity '${this._name()}' does not have a '${KEY_PARENT}' field`);
    }

    // prepare parameters for gateway and add parent id
    const preparedParams = this._prepareParams(params);
    preparedParams[KEY_PARENT] = parentId;

    return this._gateway.findAll(preparedParams)
      .map(this._extractEntities);
  }

  findFirst(params?: FindAllParameters): Observable<T> {
    return this.findAll(params)
      .map(entities => entities[0]);
  }

  update(entity: T): Observable<T> {
    const result = this._processBeforeUpdate(entity);

    if (!result.isValid()) {
      return Observable.throw(`Cannot update '${this._name()}': ${result.errors.join(', ')}`);
    }

    return this._gateway.update(entity.id, result.filteredData)
      .map(this._extractEntity);
  }

  // -----------------------------------------------------------------------------------------------
  // PRIVATE METHODS
  // -----------------------------------------------------------------------------------------------

  /**
   * @param json JSON data.
   * @returns Deserialized entity.
   */
  private _deserializeCurrentEntity = (json: any): T => {
    return this._deserializeEntity(this._type, json);
  }

  /**
   * @param type Concrete entity type.
   * @param json JSON data object.
   * @returns Newly created and populated entity instance.
   */
  private _deserializeEntity<T extends Entity>(type: { new (): T; }, json: any): T {
    const entity: T = new type;
    const metadata = EntityMetadataProvider.getAllFieldMetadata(type);

    for (const name in json) {
      // initial check on name
      if (!json.hasOwnProperty(name) || name.startsWith('@')) {
        continue;
      }

      this._populateField(entity, name, json[name], metadata.get(name));
    }

    return entity;
  }

  /**
   * @param data The value to process.
   * @param metadata Metadata for this entity field.
   * @returns Processed data.
   */
  private _deserializeEntityData(data: any, metadata: EntityFieldMetadata): any {
    if (metadata.entity && data && typeof data === 'object') {
      // data is entity object
      const entityClass: any = EntityMetadataProvider.getClassByName(metadata.entity);

      return this._deserializeEntity(entityClass, data);
    } else if (metadata.deserialize) {
      // apply custom `deserialize` function on data
      return metadata.deserialize(data);
    }

    // no extra operations necessary: required original data
    return data;
  }

  /**
   * @param response Response object from API.
   * @returns Array of entity objects.
   */
  private _extractEntities = (response: Response): Array<T> => {
    const json: any = response.json();

    // make the hydra structure explicit
    const result: HydraCollectionResult = {
      items: json[KEY_HYDRA_ITEMS],
      numTotalItems: json[KEY_HYDRA_TOTAL_ITEMS]
    };

    return result.items.map(this._deserializeCurrentEntity);
  }

  /**
   * @param response Response object from API.
   * @returns Array of entity objects.
   */
  private _extractEntity = (response: Response): T => {
    return this._deserializeCurrentEntity(response.json());
  }

  /**
   * @param field Field metadata.
   * @returns Whether the field metadata contains the 'NO_UPDATE' flag.
   */
  private _fieldCannotBeUpdated(field: EntityFieldMetadata): boolean {
    return field.flags && field.flags.indexOf(Flag.NO_UPDATE) > -1;
  }

  /**
   * @param field Field metadata.
   * @returns Whether the field metadata contains the 'GENERATED' flag.
   */
  private _fieldIsGenerated(field: EntityFieldMetadata): boolean {
    return field.flags && field.flags.indexOf(Flag.GENERATED) > -1;
  }

  /**
   * @param field Field metadata.
   * @returns Whether the field metadata contains the 'REQUIRED' flag.
   */
  private _fieldIsRequired(field: EntityFieldMetadata): boolean {
    return field.flags && field.flags.indexOf(Flag.REQUIRED) > -1;
  }

  /**
   * Shorthand for getting the entity name.
   */
  private _name(): string {
    return this._type.name;
  }

  /**
   * @param entity Entity instance that needs to be populated.
   * @param name Property name.
   * @param value Property value.
   * @param metadata Map of entity field metadata.
   */
  private _populateField(entity: any, name: string, value: any, metadata: EntityFieldMetadata) {
    if (!metadata) {
      console.warn(`No @EntityField() for '${this._name()}.${name}'`);
      return;
    }

    if (value instanceof Array) {
      entity[name] = value.map(v => this._deserializeEntityData(v, metadata));
    } else {
      entity[name] = this._deserializeEntityData(value, metadata);
    }
  }

  /**
   * @param params Parameters object. Can be null.
   * @returns Parameters, prepared for gateway.
   */
  private _prepareParams(params?: FindParameters | FindAllParameters): { [key: string]: any } {
    if (!params) {
      return;
    }

    const prepared: any = {};

    if (params.expand) {
      // expand parameter is CSV list of entity names
      prepared[KEY_EXPAND] = params.expand.map(entity => entity && entity.name).join(',');
    }

    // grab 'order' filter from parameters
    const order: { [key: string]: string } = (<FindAllParameters>params).order;

    if (order) {
      for (const key in order) {
        if (order.hasOwnProperty(key)) {
          // add order param
          prepared[`${KEY_ORDER}[${key}]`] = order[key];
        }
      }
    }

    return prepared;
  }

  /**
   * @param entity The entity to process.
   * @returns Result object, containing possible errors and filtered data.
   */
  private _processBeforeCreate(entity: T): PrePersistResult {
    const result = new PrePersistResult();

    // default 'filtered' data: entity object
    result.filteredData = entity;

    // initial checks fail: skip the rest
    if (!entity) {
      result.errors.push('Entity is empty / undefined');
      return result;
    }

    // check all field metadata
    EntityMetadataProvider.getAllFieldMetadata(this._type).forEach((field, name) => {
      const value: any = (<any>entity)[name];

      if (typeof value === 'undefined') {
        // add error when required field is empty
        if (this._fieldIsRequired(field)) {
          result.errors.push(`Required property '${name}' is invalid`);
        }

        // skip other checks
        return;
      }

      // skip fields that are generated
      if (this._fieldIsGenerated(field)) {
        return;
      }

      // apply serialization function to filtered data
      if (field.serialize) {
        result.filteredData[name] = field.serialize(value, field);
      }
    });

    return result;
  }

  /**
   * @param entity The entity to process.
   * @returns Result object, containing possible errors and filtered data.
   */
  private _processBeforeUpdate(entity: T): PrePersistResult {
    const result = new PrePersistResult();

    if (!entity) {
      result.errors.push('Entity is undefined');
    } else if (!entity.id) {
      result.errors.push(`Property 'id' is invalid`);
    }

    // initial checks fail: skip the rest
    if (!result.isValid()) {
      return result;
    }

    // check all field metadata
    EntityMetadataProvider.getAllFieldMetadata(this._type).forEach((field, name) => {
      const value: any = (<any>entity)[name];

      // no entity value or field cannot be updated? skip update
      if (typeof value === 'undefined' ||
        this._fieldIsGenerated(field) ||
        this._fieldCannotBeUpdated(field)) {
        return;
      }

      if (field.serialize) {
        // apply serialization function
        result.filteredData[name] = field.serialize(value, field);
      } else {
        result.filteredData[name] = value;
      }
    });

    return result;
  }

}

/**
 * Type for an API result in the Hydra collection format.
 */
interface HydraCollectionResult {
  items: Array<any>;
  numTotalItems: number;
}

/**
 * Helper class for processing entity data before persisting it.
 */
class PrePersistResult {

  /**
   * Array of error messages, empty if everything is valid.
   */
  errors: Array<string> = [];

  /**
   * Object of filtered data after processing.
   */
  filteredData: any = {};

  isValid(): boolean {
    return this.errors.length < 1;
  }

}
