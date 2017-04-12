import { EntityMetadataService } from './entity-metadata-service.service';
import { EntityClassMetadata, EntityFieldMetadata } from './entity-metadata';

/**
 * Required decorator for entity classes.
 *
 * @param metadata The metadata object that is passed in the decorator.
 */
export function EntityClass(metadata: EntityClassMetadata) {
  return function (target: Function) {
    // store metadata in service
    EntityMetadataService.addClassMetadata(target, metadata);
  };
}

/**
 * Required decorator for entity fields (properties).
 *
 * @param metadata The metadata object that is passed in the decorator.
 */
export function EntityField(metadata: EntityFieldMetadata = {}) {
  return function (target: object, propertyKey: string) {
    // store metadata in service
    EntityMetadataService.addFieldMetadata(target.constructor, propertyKey, metadata);
  };
}
