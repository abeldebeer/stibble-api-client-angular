import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

import { Token } from "./token";
import { TokenStorage } from "./token-storage";

export abstract class AbstractTokenStorage implements TokenStorage {

  private _hasValidTokenPublisher: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    this._publishHasValidToken();
  }

  public abstract getToken(): Token;

  public hasValidToken(): boolean {
    const token: Token = this.getToken();

    if (token) {
      if (token.isValid()) {
        return true;
      }

      // stored token is invalid (expired) - remove it
      this.removeToken();
    }

    return false;
  }

  public observeTokenAvailable(): Observable<boolean> {
    return this._hasValidTokenPublisher;
  }

  public removeToken(): void {
    this._publishHasValidToken();
  }

  public storeToken(token: Token): void {
    this._publishHasValidToken();
  }

  private _publishHasValidToken() {
    this._hasValidTokenPublisher.next(this.hasValidToken());
  }

}
