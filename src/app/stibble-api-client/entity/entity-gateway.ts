import { PATH_API, KEY_PARENT } from './../client/client-constants';
import { Observable } from 'rxjs/Observable';
import { Headers, Response, Http, RequestOptionsArgs } from '@angular/http';
import { TokenStorageProvider } from '../token/token-storage-provider.service';
import { ClientConfig } from '../client/client-config.service';
import { Entity } from './entity';
import { EntityClassMetadata } from './entity-metadata';
import { Gateway } from './gateway';

const REQUEST_OPTIONS: RequestOptionsArgs = {
  headers: new Headers({
    'Accept': 'application/ld+json',
    'Content-Type': 'application/json; charset=utf-8',
  })
};

export class EntityGateway implements Gateway {

  constructor(
    private _metadata: EntityClassMetadata,
    private _clientConfig: ClientConfig,
    private _tokenStorageProvider: TokenStorageProvider,
    private _http: Http,
  ) { }

  // -----------------------------------------------------------------------------------------------
  // PUBLIC METHODS
  // -----------------------------------------------------------------------------------------------

  create(entity: Entity): Observable<Response> {
    return this._http.post(this._createUrl(), entity, this._createRequestOptions());
  }

  find(id: string): Observable<Response> {
    return this._http.get(this._createUrl(id), this._createRequestOptions());
  }

  findAll(): Observable<Response> {
    return this._http.get(this._createUrl(), this._createRequestOptions());
  }

  findByParent(parentId: string): Observable<Response> {
    const params: any = {};
    params[KEY_PARENT] = parentId;

    const options: RequestOptionsArgs = this._createRequestOptions();
    options.params = params;

    return this._http.get(this._createUrl(), options);
  }

  // -----------------------------------------------------------------------------------------------
  // PRIVATE METHODS
  // -----------------------------------------------------------------------------------------------

  private _createRequestOptions(): RequestOptionsArgs {
    REQUEST_OPTIONS.headers.set('Authorization', `Bearer ${this._tokenStorageProvider.getToken()}`);

    return REQUEST_OPTIONS;
  }

  /**
   * @param id Resource unique identifier (optional).
   */
  private _createUrl(id?: string): string {
    const url: string = this._clientConfig.baseUrl + PATH_API + this._metadata.endpoint;

    // id provided? append to url
    return url + (id ? `/${id}` : '');
  }

}
