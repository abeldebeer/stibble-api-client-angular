import { EntityMetadataService } from './entity/entity-metadata-service.service';
import { Entity } from './entity/entity';
import { Repository } from './entity/repository';
import { RepositoryProvider } from './entity/repository-provider.service';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders, OpaqueToken, InjectionToken } from '@angular/core';
import { HttpModule } from '@angular/http';
import { TokenService } from './token/token-service.service';
import { TokenStorageProvider } from './token/token-storage-provider.service';
import { TokenGateway } from './token/token-gateway.service';
import { ClientConfig } from './client/client-config.service';
import { entityInjectionTokenMap } from './client/client-di';

// -------------------------------------------------------------------------------------------------
// GENERATE ENTITY REPOSITORY FACTORIES
// -------------------------------------------------------------------------------------------------

function repositoryFactory(type: { new (): Entity; }): Function {
  return (repositoryProvider: RepositoryProvider): Repository<Entity> => {
    return repositoryProvider.getRepository(type);
  };
};

const repositoryFactories: any[] = [];

entityInjectionTokenMap.forEach((entity, injectionToken) => {
  repositoryFactories.push({
    provide: injectionToken,
    useFactory: repositoryFactory(entity),
    deps: [RepositoryProvider]
  });
});

// -------------------------------------------------------------------------------------------------
// MODULE DEFINITION
// -------------------------------------------------------------------------------------------------

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
        EntityMetadataService,
        TokenGateway,
        TokenService,
        TokenStorageProvider,
        RepositoryProvider,
        ...repositoryFactories
      ]
    };
  }

}
