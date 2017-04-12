import { KEY_PARENT } from './../client/client-constants';
import { EntityFieldMetadata } from './entity-metadata';
import { Observable } from 'rxjs/Observable';
import { Gateway } from './gateway';
import { EntityMetadataService } from './entity-metadata-service.service';
import { Repository } from './repository';
import { Entity } from './entity';
import 'rxjs/add/operator/map';

/**
 * Type for an API result in the Hydra collection format.
 */
interface HydraCollectionResult {
  items: Array<any>;
  numTotalItems: number;
}

export class EntityRepository<T extends Entity> implements Repository<T> {

  // -----------------------------------------------------------------------------------------------
  // CONSTRUCTOR
  // -----------------------------------------------------------------------------------------------

  constructor(
    private _type: { new (): T; },
    private _metadataService: EntityMetadataService,
    private _gateway: Gateway
  ) { }

  // -----------------------------------------------------------------------------------------------
  // PUBLIC METHODS
  // -----------------------------------------------------------------------------------------------

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
      console.warn('Entity `' + this._type.name + '` does not have a `' + KEY_PARENT + '` field');
    }

    return this._gateway.findByParent(parentId)
      .map(response => this._createEntities(response.json()));
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
      items: json['hydra:member'],
      numTotalItems: json['hydra:totalItems']
    };

    return result.items.map(data => this._createEntity(data));
  }

  /**
   * @param json Object containing the entity properties.
   * @returns New entity, populated from data object.
   */
  private _createEntity(json: any): T {
    const entity: T = new this._type;

    for (const name in json) {
      if (!json.hasOwnProperty(name) || name.startsWith('@')) {
        continue;
      }

      this._populateField(entity, name, json[name]);
    }

    return entity;
  }

  /**
   * @param entity Entity instance that needs to be populated.
   * @param name Property name.
   * @param value Property value.
   */
  private _populateField(entity: any, name: string, value: any) {
    const metadata: EntityFieldMetadata =
      this._metadataService.getFieldMetadata(entity.constructor, name);

    if (!metadata) {
      console.warn('No @EntityField() for `' + this._type.name + '.' + name + '`');
      return;
    }

    if (metadata.convert) {
      entity[name] = metadata.convert(value);
    } else {
      entity[name] = value;
    }
  }

}
