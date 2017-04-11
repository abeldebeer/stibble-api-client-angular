import { EntityMetadataService } from './entity-metadata-service.service';
import { EntityClassMetadata } from './entity-class-metadata';

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
