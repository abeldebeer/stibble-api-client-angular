import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { Token } from "./token";
import { TokenGateway } from "./token-gateway.service";
import { TokenStorage } from "./token-storage";
import { TokenStorageProvider } from "./token-storage-provider.service";

@Injectable()
export class TokenService {

  constructor(
    private _tokenGateway: TokenGateway,
    private _tokenStorageProvider: TokenStorageProvider
  ) { }

  public authenticate(email: string, password: string): Observable<Token> {
    return this._tokenGateway.authenticate(email, password);
  }

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
