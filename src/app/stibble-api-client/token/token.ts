import { TokenPayload } from './token-payload';

const REGEX_ENCODED_TOKEN: RegExp = /^[\w-]+\.[\w-]+\.[\w-]+$/;

export class Token {

  private _decodedPayload: TokenPayload;
  private readonly _storedAt: number = new Date().getTime();

  constructor(private _encodedToken: string) {
    if (!this._encodedToken || !this._encodedToken.match(REGEX_ENCODED_TOKEN)) {
      throw new Error('Provided value must be a valid JWT encoded token');
    }
  }

  public isValid(): boolean {
    // server: expire time minus issued time, converted to milliseconds
    const serverDiffMillis: number = (this.payload.exp - this.payload.iat) * 1000;

    // client: token store time plus server diff
    const clientExpireTime: number = this._storedAt + serverDiffMillis;

    // is valid when client expire time is later than now
    return clientExpireTime > new Date().getTime();
  }

  public get encodedToken(): string {
    if (!this._encodedToken) {
      throw new Error('Encoded payload is empty');
    }

    return this._encodedToken;
  }

  public get payload(): TokenPayload {
    if (!this._decodedPayload) {
      // split encoded
      const encodedPayload: string = this.encodedToken.split('.')[1];
      this._decodedPayload = JSON.parse(atob(encodedPayload));
    }

    return this._decodedPayload;
  }

}
