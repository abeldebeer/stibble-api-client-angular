import { TokenPayload } from './token-payload';

const REGEX_ENCODED_TOKEN: RegExp = /^[\w-]+\.[\w-]+\.[\w-]+$/;

export class Token {

  private _decodedPayload: TokenPayload;

  constructor(private _encodedToken: string) {
    if (!this._encodedToken || !this._encodedToken.match(REGEX_ENCODED_TOKEN)) {
      throw new Error('Provided value must be a valid JWT encoded token');
    }
  }

  /**
   * @returns boolean Whether the token has not expired.
   */
  public isValid(): boolean {
    return (this.payload.exp * 1000) > new Date().getTime();
  }

  /**
   * @returns string The raw encoded token string.
   */
  public get encodedToken(): string {
    return this._encodedToken;
  }

  /**
   * @returns TokenPayload The decoded token payload.
   */
  public get payload(): TokenPayload {
    if (!this._decodedPayload) {
      // split encoded
      const encodedPayload: string = this.encodedToken.split('.')[1];
      this._decodedPayload = JSON.parse(atob(encodedPayload));
    }

    return this._decodedPayload;
  }

  public toString(): string {
    return this.encodedToken;
  }

}
