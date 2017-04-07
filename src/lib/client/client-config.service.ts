import { Injectable } from "@angular/core";

import { DEFAULT_BASE_URL } from "./client-constants";
import { TokenStorage } from "../token/token-storage";
import { TokenStorageProvider } from "../token/token-storage-provider.service";

@Injectable()
export class ClientConfig {

  private _baseUrl: string = DEFAULT_BASE_URL;

  constructor(private _tokenStorageProvider: TokenStorageProvider) { }

  public set tokenStorage(tokenStorage: TokenStorage) {
    this._tokenStorageProvider.tokenStorage = tokenStorage;
  }

  public set baseUrl(baseUrl: string) {
    const lastSlash: number = baseUrl.lastIndexOf('/');

    if (lastSlash === baseUrl.length - 1) {
      baseUrl = baseUrl.substring(0, lastSlash);
    }

    this._baseUrl = baseUrl;
  }

  public get baseUrl(): string {
    return this._baseUrl;
  }

}
