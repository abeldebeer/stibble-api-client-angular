import { Injectable } from "@angular/core";

import { AbstractTokenStorage } from "./abstract-token-storage";
import { Token } from "./token";

/**
 * Implementation of `TokenStorage` using where the token is stored in memory.
 */
@Injectable()
export class InMemoryTokenStorage extends AbstractTokenStorage {

  private _token: Token = null;

  public getToken(): Token {
    return this._token;
  }

  public removeToken(): void {
    this._token = null;

    super.removeToken();
  }

  public storeToken(token: Token): void {
    this._token = token;

    super.storeToken(token);
  }

}
