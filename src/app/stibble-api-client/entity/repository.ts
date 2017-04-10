import { Observable } from 'rxjs/Observable';
import { Entity } from './entity';

export interface Repository<T extends Entity> {

  find(id: string): Observable<T>;
  findAll(): Observable<T[]>;

}
