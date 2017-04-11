import { Entity } from './entity';
import { EntityMetadataService } from './entity-metadata-service.service';
import { EntityFieldMetadata } from './entity-field-metadata';

export function EntityField(metadata: EntityFieldMetadata = {}) {
    return function(target: object, propertyKey: string) {
        EntityMetadataService.addFieldMetadata(target.constructor, propertyKey, metadata);
    };
}


// TODO: remove, or replace service implementation with this reflection solution
// import 'reflect-metadata';

// const fieldMetadataKey = Symbol('field');

// export function EntityField(metadata: EntityFieldMetadata = {}) {
//   return Reflect.metadata(fieldMetadataKey, metadata);
// }

// export function getEntityField(target: any, propertyKey: string): EntityFieldMetadata {
//   return Reflect.getMetadata(fieldMetadataKey, target, propertyKey);
// }
