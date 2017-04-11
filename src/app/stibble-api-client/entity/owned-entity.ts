import { Entity } from './entity';

export interface OwnedEntity extends Entity {

  owner: string;

}
