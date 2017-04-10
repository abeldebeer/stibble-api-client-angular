import { Entity } from './entity';
import { Repository } from './repository';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class RepositoryProvider {

  public getRepository<T extends Entity>(type: { new (): T; }): Repository<T> {
    return <Repository<T>>{
      find(id: string): Observable<T> {
        return Observable.of(null);
      },
      findAll(): Observable<T[]> {
        return Observable.of([]);
      }
    };
  }

}
