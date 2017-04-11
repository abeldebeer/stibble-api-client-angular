import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export interface Gateway {

  /**
   * Find one entity by its unique resource ID.
   */
  find(id: string): Observable<Response>;

  /**
   * Find all entities.
   */
  findAll(): Observable<Response>;

}
