import { STIBBLE_USER, STIBBLE_APP } from './stibble-api-client/client/client-di';
import { App } from './stibble-api-client/stibble/app';
import { User } from './stibble-api-client/stibble/user';
import { RepositoryProvider } from './stibble-api-client/entity/repository-provider.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Inject } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import {
  ClientConfig,
  LocalStorageTokenStorage,
  Repository,
  StibbleApiClientModule,
  TokenService
} from './stibble-api-client';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    StibbleApiClientModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    clientConfig: ClientConfig,
    tokenService: TokenService,
    @Inject(STIBBLE_USER) userRepository: Repository<User>,
    @Inject(STIBBLE_APP) appRepository: Repository<App>,
  ) {
    clientConfig.baseUrl = 'http://localhost';
    clientConfig.tokenStorage = new LocalStorageTokenStorage();

    tokenService.authenticate('YOUR_USERNAME', 'YOUR_PASSWORD')
      .subscribe(token => {
        console.log(token);

        userRepository.findAll().subscribe(console.log, console.error);
        appRepository.findAll().subscribe(console.log, console.error);
      }, console.error);
  }

}
