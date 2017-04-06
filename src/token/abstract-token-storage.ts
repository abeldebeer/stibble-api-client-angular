import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

import { Token } from "./token";
import { TokenStorage } from "./token-storage";

export abstract class AbstractTokenStorage implements TokenStorage {

  private _hasValidTokenPublisher: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public abstract getToken(): Token;

  public hasValidToken(): boolean {
    const token: Token = this.getToken();

    return !!token && token.isValid();
  }

  public observeTokenAvailable(): Observable<boolean> {
    return this._hasValidTokenPublisher;
  }

  public removeToken(): void {
    this._hasValidTokenPublisher.next(this.hasValidToken());
  }

  public storeToken(token: Token): void {
    this._hasValidTokenPublisher.next(this.hasValidToken());
  }

}
