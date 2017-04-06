import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { ClientConfig } from "../client/client-config.service";
import { PATH_TOKEN } from "../client/client-constants";
import { HttpProvider } from "../http/http-provider.service";
import { Token } from "./token";

@Injectable()
export class TokenGateway {

    constructor(
        private _clientConfig: ClientConfig,
        private _httpProvider: HttpProvider
    ) { }

    public authenticate(username: string, password: string): Observable<Token> {
        const url: string = this._clientConfig.baseUrl + PATH_TOKEN;
        const authHeader = 'Basic ' + btoa(username + ':' + password);
        const options: RequestOptionsArgs = {
            headers: new Headers({
                'Authorization': authHeader,
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };

        // create token
        return this._httpProvider.http.post(url, null, options)
            .map((response: any) => new Token(response.json().token));
    }

}
