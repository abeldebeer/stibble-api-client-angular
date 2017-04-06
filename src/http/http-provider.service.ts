import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class HttpProvider {

  private _http: Http;

  public get http(): Http {
    return this._http;
  }

  public set http(value: Http) {
    this._http = value;
  }

}
