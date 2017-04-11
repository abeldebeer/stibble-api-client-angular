export interface TokenPayload {

  /**
   * Timestamp of when the token will expire.
   */
  exp: number;

  /**
   * Timestamp of when the token was issued.
   */
  iat: number;

}
