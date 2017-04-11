import { EntityMetadataService } from './entity-metadata-service.service';
import { EntityFieldMetadata } from './entity-field-metadata';

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
