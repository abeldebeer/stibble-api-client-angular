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
    const errors = this._validateBeforeCreate(entity);

    if (errors.length > 0) {
      return Observable.throw(`Cannot create '${this._name()}': ${errors.join(', ')}`);
    }

    return this._gateway.create(entity)
      .map(response => this._createEntity(response.json()));
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

    return this._gateway.findByParent(parentId)
      .map(response => this._createEntities(response.json()));
  }

  findFirst(): Observable<T> {
    return this.findAll()
      .map(entities => entities[0]);
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
   * @param entity The entity to validate.
   * @returns Array of error messages, empty array if no errors.
   */
  private _validateBeforeCreate(entity: any): Array<string> {
    const errors: Array<string> = [];

    if (!entity) {
      errors.push('Entity is empty / undefined');
      return errors;
    }

    // check all field metadata
    this._metadataService.getAllFieldMetadata(this._type).forEach((field, name) => {
      if (!field.flags) {
        return;
      }

      // add error when required field is empty
      if (typeof entity[name] === 'undefined' && field.flags.indexOf(Flag.REQUIRED) > -1) {
        errors.push(`Property '${name}' is required`);
      }
    });

    return errors;
  }

}
