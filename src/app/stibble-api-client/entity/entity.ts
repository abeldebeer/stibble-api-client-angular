/**
 * Type with basic entity properties.
 */
export interface Entity {

  /**
   * International resource identifier, e.g. `/api/entities/id`.
   */
  iri: string;

  /**
   * Just the unique identifier part of the `iri`, instead of the full path.
   */
  id: string;

  /**
   * When the entity was created.
   */
  createdAt: Date;

  /**
   * When the entity was last updated.
   */
  updatedAt: Date;

}
