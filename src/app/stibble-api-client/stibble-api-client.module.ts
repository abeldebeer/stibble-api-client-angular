import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { TokenService } from './token/token-service.service';
import { TokenStorageProvider } from './token/token-storage-provider.service';
import { TokenGateway } from './token/token-gateway.service';
import { ClientConfig } from './client/client-config.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ]
})
export class StibbleApiClientModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StibbleApiClientModule,
      providers: [
        ClientConfig,
        TokenGateway,
        TokenService,
        TokenStorageProvider
      ]
    };
  }

}
