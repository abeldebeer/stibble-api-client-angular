import { Observable } from 'rxjs/Observable';
import { Entity } from './entity';
import { FindAllParameters, FindParameters } from './entity-parameters';

export interface Repository<T extends Entity> {

  /**
   * Create the provided entity.
   */
  create(entity: T): Observable<T>;

  /**
   * Delete the provided entity. Returned value is the ID of the entity that was deleted.
   */
  delete(entity: T): Observable<string>;

  /**
   * Delete the entity with the provided ID. Returned value is the same ID.
   */
  deleteById(id: string): Observable<string>;

  /**
   * Find one entity by its unique resource ID.
   */
  find(id: string, params?: FindParameters): Observable<T>;

  /**
   * Find all entities.
   */
  findAll(params?: FindAllParameters): Observable<Array<T>>;

  /**
   * Find all entities by their parent (if supported).
   */
  findByParent(parentId: string, params?: FindAllParameters): Observable<Array<T>>;

  /**
   * Find the first entity of the collection.
   */
  findFirst(params?: FindAllParameters): Observable<T>;

  /**
   * Update the provided entity.
   */
  update(entity: T): Observable<T>;

}
