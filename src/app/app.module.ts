import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Inject } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

// import library dependencies
import {
  ClientConfig,
  LocalStorageTokenStorage,
  StibbleApiClientModule,
} from './stibble-api-client'; // should be 'stibble-api-client-angular' in your project

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    StibbleApiClientModule // import module
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  // example of API client configuration
  constructor(clientConfig: ClientConfig) {
    // required: set token storage implementation
    clientConfig.tokenStorage = new LocalStorageTokenStorage();

    // optional: set base URL
    clientConfig.baseUrl = 'http://localhost';
  }

}
