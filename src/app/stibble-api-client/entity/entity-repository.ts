import { EntityFieldMetadata } from './entity-field-metadata';
import { Observable } from 'rxjs/Observable';
import { EntityGateway } from './entity-gateway';
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

  constructor(
    private _type: { new (): T; },
    private _metadataService: EntityMetadataService,
    private _gateway: EntityGateway
  ) { }

  find(id: string): Observable<T> {
    return this._gateway.find(id)
      .map(response => this._createEntity(response.json()));
  }

  findAll(): Observable<T[]> {
    return this._gateway.findAll()
      .map(response => {
        const json: any = response.json();

        // make the hydra structure explicit
        const result: HydraCollectionResult = {
          items: json['hydra:member'],
          numTotalItems: json['hydra:totalItems']
        };

        return result.items.map(data => this._createEntity(data));
      });
  }

  /**
   * @param data Object containing the entity properties.
   * @returns New entity, populated from data object.
   */
  private _createEntity(data: any): T {
    const entity: T = new this._type;

    for (const name in data) {
      if (!data.hasOwnProperty(name) || name.startsWith('@')) {
        continue;
      }

      this._populateField(entity, name, data[name]);
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
