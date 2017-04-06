import { Injectable } from "@angular/core";
import { Token } from "./token";
import { TokenStorage } from "./token-storage";
import { TokenStorageProvider } from "./token-storage-provider.service";
import { Observable } from "rxjs";

@Injectable()
export class TokenService {

  constructor(private _tokenStorageProvider: TokenStorageProvider) { }

  /**
   * TODO: remove method unless required
   */
  public hasValidToken(): boolean {
    return this.tokenStorage.hasValidToken();
  }

  private get tokenStorage(): TokenStorage {
    return this._tokenStorageProvider.tokenStorage;
  }

}
