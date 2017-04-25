import { RequestOptionsArgs, Response, ResponseType } from '@angular/http';

const DEFAULT_MESSAGE = 'Unrecoverable error';
const DEFAULT_DESCRIPTION = `Stibble API client operation resulted in unrecoverable error - ` +
  `check the browser's console for more information`;

const ResponseTypeMessage = {
  [ResponseType.Basic]: 'Basic',
  [ResponseType.Cors]: 'Cors',
  [ResponseType.Default]: 'Default',
  [ResponseType.Error]: 'Error',
  [ResponseType.Opaque]: 'Opaque',
};

export class ClientError extends Error {

  // -----------------------------------------------------------------------------------------------
  // PUBLIC STATIC METHODS
  // -----------------------------------------------------------------------------------------------

  /**
   * Create a client error object from an HTTP response.
   *
   * @param response Response from the Angular HTTP client.
   * @param requestUrl Optional: URL that was requested.
   */
  public static from(response: Response, requestUrl?: string): ClientError {
    let message: string = DEFAULT_MESSAGE;
    const code: number = response.status || 0;
    let description: string = DEFAULT_DESCRIPTION;
    const url: string = response.url || requestUrl;
    const responseType: string = ResponseTypeMessage[response.type];

    if (response.statusText) {
      message = response.statusText;
    }

    const json = response.json();

    if (!(json instanceof ProgressEvent) && typeof json.error === 'object') {
      message = json.error.message;
      description = json.error.description;
    }

    return new ClientError(message, code, description, url, responseType);
  }

  // -----------------------------------------------------------------------------------------------
  // CONSTRUCTOR
  // -----------------------------------------------------------------------------------------------

  /**
   * @param message Error message.
   * @param code Error (status) code.
   * @param description Description of the error that occurred.
   * @param url Requested URL that lead to this error.
   * @param responseType Indication of the type of response (error).
   */
  constructor(
    public readonly message: string,
    public readonly code: number = 0,
    public readonly description?: string,
    public readonly url?: string,
    public readonly responseType?: string,
  ) {
    super(message);

    // set the prototype explicitly
    Object.setPrototypeOf(this, ClientError.prototype);
  }

}
