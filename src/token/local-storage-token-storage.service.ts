import { Injectable } from "@angular/core";

import { Token } from "./token";
import { TokenStorage } from "./token-storage";

/**
 * Implementation of `TokenStorage` using browser `localStorage`.
 */
@Injectable()
export class LocalStorageTokenStorage implements TokenStorage {

  private _localStorageKey: string = 'stibble_api_client_angular_token';

  public getToken(): Token {
    const encodedToken: string = localStorage.getItem(this.localStorageKey);

    return encodedToken ? new Token(encodedToken) : null;
  }

  public hasToken(): boolean {
    return !!this.getToken();
  }

  public removeToken(): void {
    localStorage.removeItem(this.localStorageKey);
  }

  public storeToken(token: Token): void {
    localStorage.setItem(this.localStorageKey, token.encodedToken);
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
