import { Entity } from './../entity/entity';
import { User } from './../stibble/user';
import { Project } from './../stibble/project';
import { App } from './../stibble/app';
import { Repository } from './../entity/repository';
import { InjectionToken } from '@angular/core';

export const STIBBLE_APP = new InjectionToken<Repository<App>>('stibble-api-client.apps');
export const STIBBLE_PROJECT = new InjectionToken<Repository<Project>>('stibble-api-client.projects');
export const STIBBLE_USER = new InjectionToken<Repository<User>>('stibble-api-client.users');

/**
 * @returns Map of injection tokens to entity classes.
 */
export function getRepositoryInjectionTokens(): Map<InjectionToken<Repository<Entity>>, { new (): Entity; }> {
  const map: Map<InjectionToken<Repository<Entity>>, { new (): Entity; }> = new Map();
  map.set(STIBBLE_APP, App);
  map.set(STIBBLE_PROJECT, Project);
  map.set(STIBBLE_USER, User);

  return map;
}
