import { USERS } from './stibble-api-client/client/client-di';
import { User } from './stibble-api-client/entity/user';
import { RepositoryProvider } from './stibble-api-client/entity/repository-provider.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Inject } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import {
  ClientConfig,
  LocalStorageTokenStorage,
  StibbleApiClientModule,
  Repository
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

  constructor( @Inject(USERS) repository: Repository<User>) {
    repository.findAll()
      .subscribe(console.log, console.error);
  }

}
