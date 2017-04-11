import { Entity } from './../entity/entity';
import { User } from './../entity/user';
import { Project } from './../entity/project';
import { App } from './../entity/app';
import { Repository } from './../entity/repository';
import { InjectionToken } from '@angular/core';

export const APPS = new InjectionToken<Repository<App>>('stibble-api-client.apps');
export const PROJECTS = new InjectionToken<Repository<Project>>('stibble-api-client.projects');
export const USERS = new InjectionToken<Repository<User>>('stibble-api-client.users');

export const entityInjectionTokenMap: Map<InjectionToken<Repository<Entity>>, { new (): Entity; }> = new Map();
entityInjectionTokenMap.set(APPS, App);
entityInjectionTokenMap.set(PROJECTS, Project);
entityInjectionTokenMap.set(USERS, User);
