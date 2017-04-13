import { EntityMetadataService } from './../entity/entity-metadata-service.service';
import { EntityFieldMetadata } from './../entity/entity-metadata';
import { isIri, createIri } from '../entity/gateway-helper';

export function toString(value: any): string {
  return value ? value.toString() : value;
}

export function normalizeId(value: any): string {
  return toString(value);
}

/**
 * Convert entity ID to IRI (International Resource Identifier), which is the format that the API
 * expects for defining entity relations.
 *
 * @param id The entity ID.
 * @param field The entity field metadata.
 */
export function idToIri(id: string, field: EntityFieldMetadata): string {
  if (isIri(id)) {
    // already is IRI
    return id;
  } else if (!field.entity) {
    console.warn(`Missing required 'entity' property in field metadata`);
    return id;
  }

  // create IRI
  return createIri(EntityMetadataService.getClassMetadata(field.entity), id);
}
