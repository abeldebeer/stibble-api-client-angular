import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { HttpProvider } from "../http/http-provider.service";
import { TokenStorage } from "../token/token-storage";
import { TokenStorageProvider } from "../token/token-storage-provider.service";

@Injectable()
export class ClientConfig {

  private _baseUrl: string = 'http://api.stibble.nl';

  constructor(
    private _httpProvider: HttpProvider,
    private _tokenStorageProvider: TokenStorageProvider
  ) { }

  public provideHttp(http: Http): void {
    this._httpProvider.http = http;
  }

  public provideTokenStorage(tokenStorage: TokenStorage): void {
    this._tokenStorageProvider.tokenStorage = tokenStorage;
  }

  public setBaseUrl(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

}
