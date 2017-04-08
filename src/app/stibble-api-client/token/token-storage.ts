import { Observable } from 'rxjs/Observable';

import { Token } from './token';

export interface TokenStorage {

  /**
   * Return stored token.
   */
  getToken(): Token;

  /**
   * Return whether a stored token is available and hasn't expired yet.
   */
  hasValidToken(): boolean;

  /**
   * Return an observable of the availability of a valid token.
   */
  observeTokenAvailable(): Observable<boolean>;

  /**
   * Remove a stored token.
   */
  removeToken(): void;

  /**
   * Store a token.
   */
  storeToken(token: Token): void;

}
