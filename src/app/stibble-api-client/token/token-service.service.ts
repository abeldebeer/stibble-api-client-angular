import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Token } from './token';
import { TokenGateway } from './token-gateway.service';
import { TokenStorage } from './token-storage';
import { TokenStorageProvider } from './token-storage-provider.service';

@Injectable()
export class TokenService {

  constructor(
    private _tokenGateway: TokenGateway,
    private _tokenStorageProvider: TokenStorageProvider
  ) { }

  // -----------------------------------------------------------------------------------------------
  // PUBLIC METHODS
  // -----------------------------------------------------------------------------------------------

  /**
   * Create and store an authentication token.
   *
   * @param email API username.
   * @param password API password.
   */
  public authenticate(email: string, password: string): Observable<Token> {
    return this._tokenGateway.authenticate(email, password)
      // extra token from JSON response
      .map(response => new Token(response.json().token))
      // store token
      .do(token => this.tokenStorage.storeToken(token));
  }

  // -----------------------------------------------------------------------------------------------
  // TOKEN STORAGE DELEGATION
  // -----------------------------------------------------------------------------------------------

  hasValidToken(): boolean {
    return this.tokenStorage.hasValidToken();
  }

  observeTokenAvailable(): Observable<boolean> {
    return this.tokenStorage.observeTokenAvailable();
  }

  removeToken(): void {
    return this.tokenStorage.removeToken();
  }

  // -----------------------------------------------------------------------------------------------
  // PRIVATE METHODS
  // -----------------------------------------------------------------------------------------------

  private get tokenStorage(): TokenStorage {
    return this._tokenStorageProvider.tokenStorage;
  }

}
