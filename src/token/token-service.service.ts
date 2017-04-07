import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { Token } from "./token";
import { TokenGateway } from "./token-gateway.service";
import { TokenStorage } from "./token-storage";
import { TokenStorageProvider } from "./token-storage-provider.service";

@Injectable()
export class TokenService {

  constructor(
    private _tokenGateway: TokenGateway,
    private _tokenStorageProvider: TokenStorageProvider
  ) { }

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

  /**
   * Return whether a stored token is available and hasn't expired yet.
   */
  hasValidToken(): boolean {
    return this.tokenStorage.hasValidToken();
  };

  /**
   * Remove a stored token.
   */
  removeToken(): void {
    this.tokenStorage.removeToken();
  }

  private get tokenStorage(): TokenStorage {
    return this._tokenStorageProvider.tokenStorage;
  }

}
