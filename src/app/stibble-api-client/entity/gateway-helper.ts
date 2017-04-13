import { PATH_API } from './../client/client-constants';
import { EntityClassMetadata } from './entity-metadata';

/**
 * Create entity IRI (International Resource Identifier).
 *
 * @param metadata Entity class metadata.
 * @param id Optional: entity metadata.
 */
export function createIri(metadata: EntityClassMetadata, id?: string): string {
  const iri: string = PATH_API + metadata.endpoint;

  // id provided? append to iri
  return iri + (id ? `/${id}` : '');
}

/**
 * Checks whether the provided value is an IRI (International Resource Identifier).
 *
 * @param value String value.
 */
export function isIri(value: string): boolean {
  return value.indexOf('/') === 0;
}
