import { Injectable } from "@angular/core";

import { DEFAULT_LOCAL_STORAGE_TOKEN_KEY } from "../client/client-constants";
import { AbstractTokenStorage } from "./abstract-token-storage";
import { Token } from "./token";

/**
 * Implementation of `TokenStorage` using browser `localStorage`.
 */
@Injectable()
export class LocalStorageTokenStorage extends AbstractTokenStorage {

  private _localStorageKey: string = DEFAULT_LOCAL_STORAGE_TOKEN_KEY;

  public getToken(): Token {
    const encodedToken: string = localStorage.getItem(this.localStorageKey);

    return encodedToken ? new Token(encodedToken) : null;
  }

  public removeToken(): void {
    localStorage.removeItem(this.localStorageKey);

    super.removeToken();
  }

  public storeToken(token: Token): void {
    localStorage.setItem(this.localStorageKey, token.encodedToken);

    super.storeToken(token);
  }

  public get localStorageKey(): string {
    if (!this._localStorageKey) {
      throw new Error('The local storage key cannot be empty');
    }

    return this._localStorageKey;
  }

  public set localStorageKey(value: string) {
    this._localStorageKey = value;
  }

}
