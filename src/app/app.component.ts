import { Component, Inject } from '@angular/core';

import {
  App,
  Repository,
  STIBBLE_APP,
  TokenService
} from './stibble-api-client'; // should be 'stibble-api-client-angular' in your project

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  error: string;
  loading: boolean;
  userApp: App;

  constructor(
    // the token service can be injected directly
    private _tokenService: TokenService,

    // the entity repositories are as follows:
    @Inject(STIBBLE_APP) private _appRepository: Repository<App>,
  ) { }

  public onFormSubmit(event: Event, email: string, password: string) {
    event.preventDefault();

    this.error = null;
    this.loading = true;

    this._authenticate(email, password);
  }

  private _authenticate(email: string, password: string) {
    // create an authentication token
    this._tokenService.authenticate(email, password)
      .subscribe(token => this._getApp(), error => {
        this.error = 'An error occurred: ' + (error.statusText || error.status);
        this.loading = false;
      });
  }

  private _getApp() {
    // request the user's apps
    this._appRepository.findAll()
      // get the default app (first)
      .subscribe(apps => this.userApp = apps[0], console.error);
  }

}
