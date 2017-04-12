import { ProjectLocation } from './stibble-api-client/stibble/project-location';
import { Component, Inject } from '@angular/core';

import {
  App,
  Repository,
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

    // the entity repositories are injected as follows:
    @Inject(App) private _appRepository: Repository<App>,
  ) { }

  public onFormSubmit(event: Event, email: string, password: string) {
    event.preventDefault();

    this.error = null;
    this.loading = true;

    this._authenticate(email, password);
  }

  private _authenticate(email: string, password: string) {
    // create an authentication token, stored in `TokenStorage`
    this._tokenService.authenticate(email, password)
      .subscribe(token => this._getApp(), error => {
        this.error = 'An error occurred: ' + (error.statusText || error.status);
        this.loading = false;
      });
  }

  private _getApp() {
    // request the user's app
    this._appRepository.findFirst()
      // set user app property
      .subscribe((app: App) => this.userApp = app, console.error);
  }

}
