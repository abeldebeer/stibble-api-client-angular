import { PATH_API } from './../client/client-constants';
import { Observable } from 'rxjs/Observable';
import { Headers, Response, Http, RequestOptionsArgs } from '@angular/http';
import { TokenStorageProvider } from '../token/token-storage-provider.service';
import { ClientConfig } from '../client/client-config.service';
import { EntityClassMetadata } from './entity-metadata';
import { Gateway } from './gateway';

/**
 * Default options for entity endpoint requests.
 */
const DEFAULT_REQUEST_OPTIONS: RequestOptionsArgs = {
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

  create(data: { [key: string]: any }): Observable<Response> {
    return this._http.post(this._createUrl(), data, this._createRequestOptions());
  }

  find(id: string): Observable<Response> {
    return this._http.get(this._createUrl(id), this._createRequestOptions());
  }

  findAll(): Observable<Response> {
    return this._http.get(this._createUrl(), this._createRequestOptions());
  }

  findByParams(params: { [key: string]: any }): Observable<Response> {
    return this._http.get(this._createUrl(), this._createRequestOptions(params));
  }

  update(id: string, data: { [key: string]: any }): Observable<Response> {
    return this._http.put(this._createUrl(id), data, this._createRequestOptions());
  }

  // -----------------------------------------------------------------------------------------------
  // PRIVATE METHODS
  // -----------------------------------------------------------------------------------------------

  /**
   * @param params Optional request parameters (for URL query).
   */
  private _createRequestOptions(params?: { [key: string]: any }): RequestOptionsArgs {
    // create new options based on defaults
    const options: RequestOptionsArgs = { ...DEFAULT_REQUEST_OPTIONS };

    // set token bearer by fetching it from storage
    options.headers.set('Authorization', `Bearer ${this._tokenStorageProvider.getToken()}`);

    // add params if provided
    if (params) {
      options.params = params;
    }

    return options;
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
