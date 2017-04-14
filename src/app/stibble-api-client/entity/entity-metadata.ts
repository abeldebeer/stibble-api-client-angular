import { EntityFieldMetadata } from './entity-metadata';
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
   * This field's value is generated, so it should not be included when creating or updating the
   * entity.
   */
  GENERATED,

  /**
   * This field can not be updated.
   */
  NO_UPDATE,

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
  deserialize?: (value: string | number | boolean, field?: EntityFieldMetadata) => any;

  /**
   * Optional: the concrete entity type that is referenced by this field.
   */
  entity?: { new (): Entity; };

  /**
   * Optional: array of flags that can be included to describe the field.
   */
  flags?: EntityFieldFlags[];

  /**
   * Optional: function that can be included to convert the value before it is sent to the API.
   */
  serialize?: (value: any, field?: EntityFieldMetadata) => string | number | boolean;

}
