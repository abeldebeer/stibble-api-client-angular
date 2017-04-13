import { Entity } from './entity';

/**
 * Type for data object that is sent to @EntityClass decorator.
 */
export interface EntityClassMetadata {

  /**
   * Name of the entity endpoint, without slashes. Example: "project-locations".
   */
  endpoint: string;

}

export enum EntityFieldFlags {

  /**
   * This field can not be updated (directly).
   */
  IMMUTABLE,

  /**
   * This field must be included when creating the entity.
   */
  REQUIRED
}

/**
 * Type for data object that is sent to @EntityField decorator.
 */
export interface EntityFieldMetadata {

  /**
   * Optional: function that can be included to convert the value that is returned from the API.
   */
  convert?: Function;

  /**
   * Optional: the concrete entity type that is referenced by this field.
   */
  entity?: { new (): Entity; };

  /**
   * Optional: array of flags that can be included to describe the field.
   */
  flags?: EntityFieldFlags[];

}
