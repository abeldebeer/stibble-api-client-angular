import { Injectable } from "@angular/core";

import { Token } from "./token";
import { TokenStorage } from "./token-storage";

/**
 * Implementation of `TokenStorage` using where the token is stored in memory.
 */
@Injectable()
export class InMemoryTokenStorage implements TokenStorage {

  private _token: Token;

  public getToken(): Token {
    return this._token;
  }

  public hasToken(): boolean {
    return !!this.getToken();
  }

  public removeToken(): void {
    this._token = null;
  }

  public storeToken(token: Token): void {
    this._token = token;
  }

}
