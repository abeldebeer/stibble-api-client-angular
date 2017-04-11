import { Entity } from './entity';

/**
 * Type with basic properties for an entity that is owned by a user.
 */
export interface OwnedEntity extends Entity {

  /**
   * URI for the user entity that owns this entity.
   */
  owner: string;

}
