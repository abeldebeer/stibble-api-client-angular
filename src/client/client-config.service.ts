import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { DEFAULT_BASE_URL } from "./client-constants";
import { HttpProvider } from "../http/http-provider.service";
import { TokenStorage } from "../token/token-storage";
import { TokenStorageProvider } from "../token/token-storage-provider.service";

@Injectable()
export class ClientConfig {

  private _baseUrl: string = DEFAULT_BASE_URL;

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
