import { Entity } from './entity';

export interface OwnedEntity extends Entity {

  readonly owner: string;

}
