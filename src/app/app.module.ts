import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import {
  ClientConfig,
  LocalStorageTokenStorage,
  StibbleApiClientModule
} from '../lib';

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

  constructor(clientConfig: ClientConfig) {
    clientConfig.tokenStorage = new LocalStorageTokenStorage();
    clientConfig.baseUrl = 'http://localhost';
  }

}
