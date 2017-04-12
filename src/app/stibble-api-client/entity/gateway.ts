import { Entity } from './entity';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export interface Gateway {

  /**
   * Create the provided entity.
   */
  create(entity: Entity): Observable<Response>;

  /**
   * Find one entity by its unique resource ID.
   */
  find(id: string): Observable<Response>;

  /**
   * Find all entities.
   */
  findAll(): Observable<Response>;

  /**
   * Find all entities by their parent (if supported).
   */
  findByParent(parentId: string): Observable<Response>;

}
