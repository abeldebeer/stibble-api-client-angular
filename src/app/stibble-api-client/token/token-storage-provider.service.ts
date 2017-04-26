import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Token } from './token';
import { TokenStorage } from './token-storage';

@Injectable()
export class TokenStorageProvider implements TokenStorage {

  private _tokenStorage: TokenStorage;

  // -----------------------------------------------------------------------------------------------
  // TOKEN STORAGE DELEGATION
  // -----------------------------------------------------------------------------------------------

  getToken(): Token {
    return this.tokenStorage.getToken();
  }

  hasValidToken(): boolean {
    return this.tokenStorage.hasValidToken();
  }

  observeTokenAvailable(): Observable<boolean> {
    return this.tokenStorage.observeTokenAvailable();
  }

  removeToken(): void {
    return this.tokenStorage.removeToken();
  }

  storeToken(token: Token): void {
    this.tokenStorage.storeToken(token);
  }

  // -----------------------------------------------------------------------------------------------
  // GETTERS & SETTERS
  // -----------------------------------------------------------------------------------------------

  public get tokenStorage(): TokenStorage {
    if (!this._tokenStorage) {
      throw new Error(
        'Make sure you provide the `TokenStorageProvider` with a `TokenStorage` instance'
      );
    }

    return this._tokenStorage;
  }

  public set tokenStorage(value: TokenStorage) {
    this._tokenStorage = value;
  }

}
