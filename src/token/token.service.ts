import { Injectable } from "@angular/core";
import { Token } from "./token";
import { TokenStorage } from "./token-storage";
import { TokenStorageProvider } from "./token-storage-provider.service";

@Injectable()
export class TokenService {

  constructor(private _tokenStorageProvider: TokenStorageProvider) { }

  public hasValidToken(): boolean {
    if (!this.tokenStorage.hasToken()) {
      return false;
    }

    console.log(this.tokenStorage.getToken());

    return this.tokenStorage.getToken().isValid();
  }

  private get tokenStorage(): TokenStorage {
    return this._tokenStorageProvider.tokenStorage;
  }

}
