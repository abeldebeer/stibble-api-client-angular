import { EntityClassMetadata } from './entity-class-metadata';
import { EntityMetadataService } from './entity-metadata-service.service';
import { Entity } from './entity';
import { Repository } from './repository';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class RepositoryProvider {

  constructor(private _entityMetadataService: EntityMetadataService) { }

  public getRepository<T extends Entity>(type: { new (): T; }): Repository<T> {
    const metadata: EntityClassMetadata = this._entityMetadataService.getEntityClass(type);

    console.log({ metadata, type });

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
