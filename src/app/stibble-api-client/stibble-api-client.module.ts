import { Project } from './entity/project';
import { App } from './entity/app';
import { User } from './entity/user';
import { Entity } from './entity/entity';
import { Repository } from './entity/repository';
import { USERS, APPS, PROJECTS } from './client/client-di';
import { RepositoryProvider } from './entity/repository-provider.service';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders, OpaqueToken, InjectionToken } from '@angular/core';
import { HttpModule } from '@angular/http';
import { TokenService } from './token/token-service.service';
import { TokenStorageProvider } from './token/token-storage-provider.service';
import { TokenGateway } from './token/token-gateway.service';
import { ClientConfig } from './client/client-config.service';

const entityInjectionTokenMap = new Map<InjectionToken<any>, { new (): Entity; }>();
entityInjectionTokenMap.set(APPS, App);
entityInjectionTokenMap.set(PROJECTS, Project);
entityInjectionTokenMap.set(USERS, User);

const repositoryFactories: any[] = [];

function repositoryFactory<T extends Entity>(type: { new (): T; }) {
  return (repositoryProvider: RepositoryProvider): Repository<T> => {
    return repositoryProvider.getRepository(type);
  };
};

entityInjectionTokenMap.forEach((entity, injectionToken) => {
  repositoryFactories.push({
    provide: injectionToken,
    useFactory: repositoryFactory(entity),
    deps: [RepositoryProvider]
  });
});

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
        TokenStorageProvider,
        RepositoryProvider,
        ...repositoryFactories
      ]
    };
  }

}
