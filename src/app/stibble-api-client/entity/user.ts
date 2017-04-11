import { Entity } from './entity';
import { EntityClass } from './entity-class.decorator';
import { EntityField } from './entity-field.decorator';

@EntityClass({ endpoint: 'users' })
export class User implements Entity {

  @EntityField()
  id: string;

  @EntityField({ type: Date })
  createdAt: Date;

  @EntityField({ type: Date })
  updatedAt: Date;

  @EntityField()
  email: string;

  @EntityField()
  firstName: string;

  @EntityField()
  lastName: string;

}
