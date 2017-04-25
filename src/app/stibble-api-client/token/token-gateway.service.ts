import { Injectable } from '@angular/core';
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
import { PATH_TOKEN } from '../client/client-constants';
import { ClientError } from './../client/client-error';
import { Token } from './token';

@Injectable()
export class TokenGateway {

  constructor(
    private _clientConfig: ClientConfig,
    private _http: Http
  ) { }

  /**
   * Authenticate with the API.
   *
   * @param username API username.
   * @param password API password.
   */
  public authenticate(username: string, password: string): Observable<Response> {
    const url: string = this._clientConfig.baseUrl + PATH_TOKEN;
    const authHeader = `Basic ${btoa(`${username}:${password}`)}`;
    const options: RequestOptionsArgs = {
      headers: new Headers({
        'Authorization': authHeader,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    // create token
    return this._http.post(url, null, options)
      .catch(response => Observable.throw(ClientError.from(response, url)));
  }

}
