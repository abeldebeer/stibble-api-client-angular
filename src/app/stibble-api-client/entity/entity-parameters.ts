import { Entity } from './entity';

export interface ExpandEntityRelations {

  /**
   * Array of entity classes that you want to expand, meaning you will not receive IRIs to related
   * entities, but the full objects.
   * Example: [Project, ProjectLocation]
   */
  expand?: Array<{ new (): Entity; }>;

}

export interface OrderFilter {

  /**
   * Array of simple order filter objects, where the key is the name of the property you want to
   * order on and the value is the direction - ascending or descending.
   * Example: {updatedAt: 'desc', id: 'desc'}
   */
  order?: { [key: string]: 'asc' | 'desc' };

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
export interface FindAllParameters extends ExpandEntityRelations, OrderFilter { }
