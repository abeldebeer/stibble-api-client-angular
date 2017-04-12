import { EntityMetadataService } from './entity/entity-metadata-service.service';
import { Injector } from '@angular/core';
import { Project } from './stibble/project';
import { User } from './stibble/user';
import { App } from './stibble/app';
import { Entity } from './entity/entity';
import { Repository } from './entity/repository';
import { RepositoryProvider } from './entity/repository-provider.service';

/**
 * Returns a function that retrieves a repository for the provided entity class.
 */
function repositoryFactory(type: { new (): Entity; }): Function {
  return (repositoryProvider: RepositoryProvider): Repository<Entity> => {
    return repositoryProvider.getRepository(type);
  };
};

/**
 * All entities which will have generated repositories.
 */
const entityClasses: { new (): Entity; }[] = [
  App, Project, User
];

/**
 * Array of entity repository factories.
 */
export const repositoryFactories: any[] = [];

entityClasses.forEach(entity => {
  repositoryFactories.push({
    provide: entity,
    useFactory: repositoryFactory(entity),
    deps: [RepositoryProvider]
  });
});
