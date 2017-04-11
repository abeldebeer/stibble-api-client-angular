import { EntityClassMetadata } from './entity-class-metadata';
import { Injectable } from '@angular/core';

@Injectable()
export class EntityMetadataService {

  // -----------------------------------------------------------------------------------------------
  // STATIC
  // -----------------------------------------------------------------------------------------------

  private static _entityClassMetadata: Map<Function, EntityClassMetadata> = new Map();

  public static addEntityClass(target: Function, metadata: EntityClassMetadata): void {
    EntityMetadataService._entityClassMetadata.set(target, metadata);
  }

  // -----------------------------------------------------------------------------------------------
  // NON-STATIC
  // -----------------------------------------------------------------------------------------------

  public getEntityClass(target: Function): EntityClassMetadata {
    return EntityMetadataService._entityClassMetadata.get(target);
  }

}
