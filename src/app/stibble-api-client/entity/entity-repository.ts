import { EntityFieldMetadata, EntityFieldFlags as Flag } from './entity-metadata';
import { Observable } from 'rxjs/Observable';
import { Gateway } from './gateway';
import { EntityMetadataService } from './entity-metadata-service.service';
import { Repository } from './repository';
import { Entity } from './entity';
import 'rxjs/Rx';

import {
  KEY_PARENT,
  KEY_IRI,
  KEY_HYDRA_ID,
  KEY_HYDRA_ITEMS,
  KEY_HYDRA_TOTAL_ITEMS
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
      if (!json.hasOwnProperty(name)) {
        continue;
      }

      const value = json[name];
      let field = name;

      if (name === KEY_HYDRA_ID) {
        field = KEY_IRI;
      } else if (name.startsWith('@')) {
        continue;
      }

      this._populateField(entity, field, value, metadata);
    }

    return entity;
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

    if (metadata.convert) {
      // apply convert function to raw value
      entity[name] = metadata.convert(value);
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

    if (!entity) {
      result.errors.push('Entity is empty / undefined');
      return result;
    }

    // check all field metadata
    this._metadataService.getAllFieldMetadata(this._type).forEach((field, name) => {
      if (!field.flags) {
        return;
      }

      // add error when required field is empty
      if (typeof entity[name] === 'undefined' && field.flags.indexOf(Flag.REQUIRED) > -1) {
        result.errors.push(`Required property '${name}' is invalid`);
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
      // no entity value for this field? skip
      if (typeof entity[name] === 'undefined') {
        return;
      }

      // no flags or field is not immutable? add to filtered data
      if (!field.flags || field.flags.indexOf(Flag.IMMUTABLE) < 0) {
        result.filteredData[name] = entity[name];
      }
    });

    return result;
  }

}
