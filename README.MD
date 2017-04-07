# Stibble API client for Angular

This is a client for the Stibble REST API, for Angular 2 and up.

___NOTE: this is an early, in-development version!___

## Installation

To install this library into your Angular project, run:

```bash
$ npm install stibble-api-client-angular --save
```

## Add library to Angular project

To add the library to an Angular project, first import it in your module, e.g. the default
`AppModule`, and then configure it:

```typescript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

// import library module and configuration requirements
import {
  StibbleApiClientModule,
  ClientConfig,
  LocalStorageTokenStorage
} from "stibble-api-client-angular";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // import into module, with providers (`forRoot()` is required!)
    StibbleApiClientModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  // use dependency injection to request config service
  constructor(clientConfig:ClientConfig) {
    // required: set token storage, for example a `localStorage` implementation:
    clientConfig.tokenStorage = new LocalStorageTokenStorage();

    // optional: set base URL, including http(s)://
    clientConfig.baseUrl = 'https://api.stibble.com';
  }

}
```

As the example shows, it is required to provide a `TokenStorage` implementation. If your project
runs in a web browser, it is recommened to use the `LocalStorageTokenStorage`. Another possibility
is to use the provided `InMemoryTokenStorage` implementation, which just stores the token in a
variable.

## Development

To generate all `*.js`, `*.js.map` and `*.d.ts` files:

```bash
$ npm run tsc
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## Publishing the library

To publish the library, run:

```bash
$ npm run build
$ npm publish dist
```

## License

MIT © [Cooking Fox](mailto:dev@cookingfox.nl)
