/**
 * Type for data object that is sent to @EntityClass decorator.
 */
export interface EntityClassMetadata {

  /**
   * Name of the entity endpoint, without slashes. Example: "project-locations".
   */
  endpoint: string;

}

/**
 * Type for data object that is sent to @EntityField decorator.
 */
export interface EntityFieldMetadata {

  /**
   * Optional function that can be included to convert the value that is returned from the API.
   */
  convert?: Function;

}
