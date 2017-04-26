import {
  Headers,
  Http,
  RequestOptionsArgs,
  Response
  } from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { ClientConfig } from '../client/client-config.service';
import { TokenStorageProvider } from '../token/token-storage-provider.service';
import { PATH_API } from './../client/client-constants';
import { ClientError } from './../client/client-error';
import { EntityClassMetadata } from './entity-metadata';
import { Gateway } from './gateway';
import { createIri } from './gateway-helper';

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
    const url: string = this._createUrl();

    return this._http.post(url, data, this._createRequestOptions())
      .catch(response => this._handleError(response, url));
  }

  delete(id: string): Observable<Response> {
    const url: string = this._createUrl(id);

    return this._http.delete(url, this._createRequestOptions())
      .catch(response => this._handleError(response, url));
  }

  find(id: string, params?: { [key: string]: any }): Observable<Response> {
    const url: string = this._createUrl(id);

    return this._http.get(url, this._createRequestOptions(params))
      .catch(response => this._handleError(response, url));
  }

  findAll(params?: { [key: string]: any }): Observable<Response> {
    const url: string = this._createUrl();

    return this._http.get(url, this._createRequestOptions(params))
      .catch(response => this._handleError(response, url));
  }

  update(id: string, data: { [key: string]: any }): Observable<Response> {
    const url: string = this._createUrl(id);

    return this._http.put(url, data, this._createRequestOptions())
      .catch(response => this._handleError(response, url));
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
    return this._clientConfig.baseUrl + createIri(this._metadata, id);
  }

  /**
   * Handle HTTP error response.
   *
   * @param response Response from the Angular HTTP client.
   * @param requestUrl URL that was requested.
   * @returns Observable of client error object.
   */
  private _handleError(response: Response, requestUrl: string): Observable<ClientError> {
    // response says 'unauthorized': remove expired token
    if (response.status === 401) {
      this._tokenStorageProvider.tokenStorage.removeToken();
    }

    return Observable.throw(ClientError.from(response, requestUrl));
  }

}
