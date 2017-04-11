/**
 * Type with basic entity properties.
 */
export interface Entity {

  /**
   * Unique resource identifier.
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
