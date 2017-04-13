import { Entity } from './entity';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export interface Gateway {

  /**
   * Create an entity with the provided data.
   */
  create(data: { [key: string]: any }): Observable<Response>;

  /**
   * Find one entity by its unique resource ID.
   */
  find(id: string): Observable<Response>;

  /**
   * Find all entities.
   */
  findAll(): Observable<Response>;

  /**
   * Find all entities that match the provided parameters.
   */
  findByParams(params: { [key: string]: any }): Observable<Response>;

  /**
   * Update an entity with the provided id and data.
   */
  update(id: string, data: { [key: string]: any }): Observable<Response>;

}
