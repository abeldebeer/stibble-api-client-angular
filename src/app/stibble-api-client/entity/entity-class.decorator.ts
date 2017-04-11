import { EntityMetadataService } from './entity-metadata-service.service';
import { EntityClassMetadata } from './entity-class-metadata';

export function EntityClass(annotation: EntityClassMetadata) {
  return function (target: Function) {
    EntityMetadataService.addClassMetadata(target, annotation);
  };
}
