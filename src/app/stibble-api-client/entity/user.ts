import { EntityMeta } from './entity-meta';
import { Entity } from './entity';

@EntityMeta({ endpoint: 'users' })
export class User implements Entity {

  readonly id: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;

}
