import { EntityFieldMetadata } from './entity-field-metadata';
import { TokenStorageProvider } from './../token/token-storage-provider.service';
import { PATH_API } from './../client/client-constants';
import { ClientConfig } from './../client/client-config.service';
import { Response, Http, RequestOptionsArgs, Headers } from '@angular/http';
import { EntityClassMetadata } from './entity-class-metadata';
import { EntityMetadataService } from './entity-metadata-service.service';
import { Entity } from './entity';
import { Repository } from './repository';
import { Injectable, Injector, enableProdMode } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

interface Gateway {
  find(id: number): Observable<Response>;
  findAll(): Observable<Response>;
}

class EntityGateway implements Gateway {
  constructor(
    private _metadata: EntityClassMetadata,
    private _clientConfig: ClientConfig,
    private _tokenStorageProvider: TokenStorageProvider,
    private _http: Http,
  ) { }

  find(id: number): Observable<Response> {
    const url: string = this._clientConfig.baseUrl + PATH_API + this._metadata.endpoint + '/' + id;
    const authHeader: string = 'Bearer ' + this._tokenStorageProvider.getToken();
    const options: RequestOptionsArgs = {
      headers: new Headers({
        'Authorization': authHeader,
        'Accept': 'application/ld+json',
        'Content-Type': 'application/json',
      })
    };

    return this._http.get(url, options);
  }
  findAll(): Observable<Response> {
    const url: string = this._clientConfig.baseUrl + PATH_API + this._metadata.endpoint;
    const authHeader: string = 'Bearer ' + this._tokenStorageProvider.getToken();
    const options: RequestOptionsArgs = {
      headers: new Headers({
        'Authorization': authHeader,
        'Accept': 'application/ld+json',
        'Content-Type': 'application/json',
      })
    };

    return this._http.get(url, options);
  }
}

interface HydraCollectionResult {
  member: Array<any>;
  totalItems: number;
}

class EntityRepository<T extends Entity> implements Repository<T> {
  constructor(
    private _type: { new (): T; },
    private _metadataService: EntityMetadataService,
    private _gateway: EntityGateway
  ) { }

  find(id: number): Observable<T> {
    return this._gateway.find(id)
      .map(response => {
        const entity: T = new this._type;

        const data: any = response.json();

        for (const name in data) {
          if (!data.hasOwnProperty(name) || name.startsWith('@')) {
            continue;
          }

          this._populateField(entity, data, name);
        }

        return entity;
      });
  }
  findAll(): Observable<T[]> {
    return this._gateway.findAll()
      .map(response => {
        const entities: Array<T> = [];
        const json: any = response.json();
        const result: HydraCollectionResult = {
          member: json['hydra:member'],
          totalItems: json['hydra:totalItems']
        };

        result.member.forEach((data: any) => {
          console.log(data);

          const entity: T = new this._type;

          for (const name in data) {
            if (!data.hasOwnProperty(name) || name.startsWith('@')) {
              continue;
            }

            this._populateField(entity, data, name);
          }

          entities.push(entity);
        });

        return entities;
      });
  }

  private _populateField(entity: any, data: any, name: string) {
    const metadata: EntityFieldMetadata = this._metadataService.getAllFieldMetadata(entity.constructor);

    if (!metadata) {
      console.warn('No @EntityField() for `' + this._type.name + '.' + name + '`');
      return;
    }

    const value: any = data[name];

    switch (metadata.type) {
      case Date:
        entity[name] = Date.parse(value);
        break;

      default:
        entity[name] = value;
        break;
    }
  }
}

@Injectable()
export class RepositoryProvider {

  constructor(
    private _metadataService: EntityMetadataService,
    private _injector: Injector
  ) { }

  public getRepository<T extends Entity>(type: { new (): T; }): Repository<T> {
    const gateway = new EntityGateway(
      this._metadataService.getClassMetadata(type),
      this._injector.get(ClientConfig),
      this._injector.get(TokenStorageProvider),
      this._injector.get(Http)
    );

    return new EntityRepository(type, this._metadataService, gateway);
  }

}
