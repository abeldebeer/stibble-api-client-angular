import { EntityFieldMetadata, EntityFieldFlags as Flag } from './entity-metadata';
import { Observable } from 'rxjs/Observable';
import { Gateway } from './gateway';
import { createIri, isIri } from './gateway-helper';
import { EntityMetadataService } from './entity-metadata-service.service';
import { Repository } from './repository';
import { Entity } from './entity';
import 'rxjs/Rx';

import {
  KEY_PARENT,
  KEY_HYDRA_ITEMS,
  KEY_HYDRA_TOTAL_ITEMS,
  KEY_ENTITY
} from './../client/client-constants';

/**
 * Type for an API result in the Hydra collection format.
 */
interface HydraCollectionResult {
  items: Array<any>;
  numTotalItems: number;
}

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

export class EntityRepository<T extends Entity> implements Repository<T> {

  constructor(
    private _type: { new (): T; },
    private _metadataService: EntityMetadataService,
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
      .map(response => this._createEntity(response.json()));
  }

  delete(entity: T): Observable<string> {
    const id = entity.id;

    if (!id) {
      return Observable.throw(`Cannot delete '${this._name()}': Property 'id' is invalid`);
    }

    return this._gateway.delete(id)
      .map(response => id);
  }

  find(id: string): Observable<T> {
    return this._gateway.find(id)
      .map(response => this._createEntity(response.json()));
  }

  findAll(): Observable<Array<T>> {
    return this._gateway.findAll()
      .map(response => this._createEntities(response.json()));
  }

  findByParent(parentId: string): Observable<Array<T>> {
    const metadata = this._metadataService.getFieldMetadata(this._type, KEY_PARENT);

    if (!metadata) {
      console.warn(`Entity '${this._name()}' does not have a '${KEY_PARENT}' field`);
    }

    const params: any = { [KEY_PARENT]: parentId };

    return this._gateway.findByParams(params)
      .map(response => this._createEntities(response.json()));
  }

  findFirst(): Observable<T> {
    return this.findAll()
      .map(entities => entities[0]);
  }

  update(entity: T): Observable<T> {
    const result = this._processBeforeUpdate(entity);

    if (!result.isValid()) {
      return Observable.throw(`Cannot update '${this._name()}': ${result.errors.join(', ')}`);
    }

    return this._gateway.update(entity.id, result.filteredData)
      .map(response => this._createEntity(response.json()));
  }

  // -----------------------------------------------------------------------------------------------
  // PRIVATE METHODS
  // -----------------------------------------------------------------------------------------------

  /**
   * @param json Object containing the entity objects.
   * @returns Array of created entities.
   */
  private _createEntities(json: any): Array<T> {
    // make the hydra structure explicit
    const result: HydraCollectionResult = {
      items: json[KEY_HYDRA_ITEMS],
      numTotalItems: json[KEY_HYDRA_TOTAL_ITEMS]
    };

    return result.items.map(data => this._createEntity(data));
  }

  /**
   * @param json Object containing the entity properties.
   * @returns New entity, populated from data object.
   */
  private _createEntity(json: any): T {
    const entity: T = new this._type;
    const metadata = this._metadataService.getAllFieldMetadata(this._type);

    for (const name in json) {
      // initial check on name
      if (!json.hasOwnProperty(name) || name.startsWith('@')) {
        continue;
      }

      this._populateField(entity, name, json[name], metadata);
    }

    return entity;
  }

  /**
   * @param field Field metadata.
   * @returns Whether the field metadata contains the 'IMMUTABLE' flag.
   */
  private _fieldIsImmutable(field: EntityFieldMetadata): boolean {
    return field.flags && field.flags.indexOf(Flag.IMMUTABLE) > -1;
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
  private _populateField(entity: any, name: string, value: any,
    fieldMetadata: Map<string, EntityFieldMetadata>) {
    const metadata: EntityFieldMetadata = fieldMetadata.get(name);

    if (!metadata) {
      console.warn(`No @EntityField() for '${this._name()}.${name}'`);
      return;
    }

    if (metadata.deserialize) {
      // apply convert function to raw value
      entity[name] = metadata.deserialize(value);
    } else {
      entity[name] = value;
    }
  }

  /**
   * @param entity The entity to process.
   * @returns Result object, containing possible errors and filtered data.
   */
  private _processBeforeCreate(entity: T): PrePersistResult {
    const result = new PrePersistResult();
    result.filteredData = entity;

    // initial checks fail: skip the rest
    if (!entity) {
      result.errors.push('Entity is empty / undefined');
      return result;
    }

    // check all field metadata
    this._metadataService.getAllFieldMetadata(this._type).forEach((field, name) => {
      const value: any = (<any>entity)[name];
      const isDefined = typeof value !== 'undefined';

      // add error when required field is empty
      if (!isDefined && this._fieldIsRequired(field)) {
        result.errors.push(`Required property '${name}' is invalid`);
      }

      // apply serialization function
      if (isDefined && field.serialize) {
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
    this._metadataService.getAllFieldMetadata(this._type).forEach((field, name) => {
      const value: any = (<any>entity)[name];

      // no entity value or field is immutable? skip update
      if (typeof value === 'undefined' || this._fieldIsImmutable(field)) {
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
