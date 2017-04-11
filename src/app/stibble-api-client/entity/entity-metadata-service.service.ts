import { EntityFieldMetadata } from './entity-field-metadata';
import { Repository } from './repository';
import { EntityClassMetadata } from './entity-class-metadata';
import { Injectable } from '@angular/core';

@Injectable()
export class EntityMetadataService {

  // -----------------------------------------------------------------------------------------------
  // STATIC
  // -----------------------------------------------------------------------------------------------

  private static _classMetadata: Map<Function, EntityClassMetadata> = new Map();
  private static _fieldMetadata: Map<Function, Map<string, EntityFieldMetadata>> = new Map();

  public static addClassMetadata(target: Function, metadata: EntityClassMetadata): void {
    EntityMetadataService._classMetadata.set(target, metadata);
  }

  public static addFieldMetadata(target: Function, propertyKey: string, metadata: EntityFieldMetadata): void {
    const map: Map<string, EntityFieldMetadata> =
      EntityMetadataService._fieldMetadata.get(target) || new Map();

    map.set(propertyKey, metadata);

    EntityMetadataService._fieldMetadata.set(target, map);
  }

  // -----------------------------------------------------------------------------------------------
  // NON-STATIC
  // -----------------------------------------------------------------------------------------------

  public getClassMetadata(target: Function): EntityClassMetadata {
    return EntityMetadataService._classMetadata.get(target);
  }

  public getFieldMetadata(target: Function, propertyKey: string): EntityFieldMetadata {
    return EntityMetadataService._fieldMetadata.get(target).get(propertyKey);
  }

  public getAllFieldMetadata(target: Function): Map<string, EntityFieldMetadata> {
    return EntityMetadataService._fieldMetadata.get(target);
  }

}
