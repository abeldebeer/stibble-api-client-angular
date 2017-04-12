import { EntityMetadataService } from './entity/entity-metadata-service.service';
import { Entity } from './entity/entity';
import { Repository } from './entity/repository';
import { RepositoryProvider } from './entity/repository-provider.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { TokenService } from './token/token-service.service';
import { TokenStorageProvider } from './token/token-storage-provider.service';
import { TokenGateway } from './token/token-gateway.service';
import { ClientConfig } from './client/client-config.service';
import { getRepositoryInjectionTokens } from './client/client-injection';

// -------------------------------------------------------------------------------------------------
// GENERATE ENTITY REPOSITORY FACTORIES
// -------------------------------------------------------------------------------------------------

function repositoryFactory(type: { new (): Entity; }): Function {
  return (repositoryProvider: RepositoryProvider): Repository<Entity> => {
    return repositoryProvider.getRepository(type);
  };
};

const repositoryFactories: any[] = [];

getRepositoryInjectionTokens().forEach((entity, injectionToken) => {
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
  ],
  providers: [
    ClientConfig,
    EntityMetadataService,
    TokenGateway,
    TokenService,
    TokenStorageProvider,
    RepositoryProvider,
    ...repositoryFactories
  ]
})
export class StibbleApiClientModule { }
