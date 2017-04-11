/**
 * Type for data object that is sent to @EntityClass decorator.
 */
export interface EntityClassMetadata {

  /**
   * Name of the entity endpoint, without slashes. Example: "project-locations".
   */
  endpoint: string;

}
