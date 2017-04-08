export interface TokenPayload {

  /**
   * Timestamp of when the token will expire.
   */
  readonly exp: number;

  /**
   * Timestamp of when the token was issued.
   */
  readonly iat: number;

}
