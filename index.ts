import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";

import { ClientConfig } from "./src/client/client-config.service";
import { InMemoryTokenStorage } from "./src/token/in-memory-token-storage.service";
import { LocalStorageTokenStorage } from "./src/token/local-storage-token-storage.service";
import { TokenGateway } from "./src/token/token-gateway.service";
import { TokenStorageProvider } from "./src/token/token-storage-provider.service";
import { TokenService } from "./src/token/token-service.service";

export * from "./src/client/client-config.service";
export * from "./src/token/in-memory-token-storage.service";
export * from "./src/token/local-storage-token-storage.service";
export * from "./src/token/token-gateway.service";
export * from "./src/token/token-payload";
export * from "./src/token/token-storage-provider.service";
export * from "./src/token/token-storage";
export * from "./src/token/token-service.service";
export * from "./src/token/token";

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
})
export class StibbleApiClientModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StibbleApiClientModule,
      providers: [
        ClientConfig,
        InMemoryTokenStorage,
        LocalStorageTokenStorage,
        TokenGateway,
        TokenStorageProvider,
        TokenService
      ]
    };
  }
}
