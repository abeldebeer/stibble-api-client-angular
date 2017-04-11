import { Entity } from './entity';
import { EntityClass } from './entity-class.decorator';

@EntityClass({ endpoint: 'users' })
export class User implements Entity {

  readonly id: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;

}
