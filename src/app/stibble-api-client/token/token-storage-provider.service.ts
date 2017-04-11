import { Injectable } from '@angular/core';
import { TokenStorage } from './token-storage';
import { Token } from './token';

@Injectable()
export class TokenStorageProvider {

  private _tokenStorage: TokenStorage;

  public getToken(): Token {
    return this.tokenStorage.getToken();
  }

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
