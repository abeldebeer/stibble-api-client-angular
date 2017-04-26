import { RequestOptionsArgs, Response, ResponseType } from '@angular/http';
import {
  KEY_HYDRA_CONTEXT,
  KEY_HYDRA_DESCRIPTION,
  KEY_HYDRA_TITLE,
  KEY_VIOLATIONS
  } from './client-constants';

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

/**
 * Represents a violation (validation error), as reported by the API.
 */
export interface Violation {

  /**
   * Description of the violation.
   */
  message: string;

  /**
   * Path (name) of the property that contains the violation.
   */
  propertyPath: string;

}

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
    const violations: Array<Violation> = [];

    if (response.statusText) {
      message = response.statusText;
    }

    const json = response.json();

    if (typeof json === 'object' && !(json instanceof ProgressEvent)) {
      if (typeof json[KEY_HYDRA_CONTEXT] !== 'undefined') {
        // hydra error object
        message = json[KEY_HYDRA_TITLE];
        description = json[KEY_HYDRA_DESCRIPTION];

        if (typeof json[KEY_VIOLATIONS] !== 'undefined') {
          json[KEY_VIOLATIONS].forEach((violation: Violation) => {
            violations.push(violation);
          });
        }
      } else if (typeof json['error'] === 'object') {
        // simple error object
        message = json.error.message;
        description = json.error.description;
      }
    }

    return new ClientError(message, code, description, url, responseType, violations);
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
   * @param violations Array of violations.
   */
  constructor(
    public readonly message: string,
    public readonly code: number = 0,
    public readonly description?: string,
    public readonly url?: string,
    public readonly responseType?: string,
    public readonly violations?: Array<Violation>,
  ) {
    super(message);

    // set the prototype explicitly
    Object.setPrototypeOf(this, ClientError.prototype);
  }

  /**
   * @returns Whether an array of violations is available.
   */
  hasViolations() {
    return this.violations && this.violations.length > 0;
  }

}
