import { Entity } from './entity';

export interface ExpandEntityRelations {

  /**
   * Array of entity classes that you want to expand, meaning you will not receive IRIs to related
   * entities, but the full objects.
   */
  expand?: Array<{ new (): Entity; }>;

}

/**
 * Interface for parameters to pass to a "find by ID" entities request.
 */
// tslint:disable-next-line no-empty-interface
export interface FindParameters extends ExpandEntityRelations { }

/**
 * Interface for parameters to pass to a "find all" entities request.
 */
// tslint:disable-next-line no-empty-interface
export interface FindAllParameters extends ExpandEntityRelations { }
