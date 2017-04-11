import { Entity } from './entity';
import { EntityClass } from './entity-class.decorator';
import { EntityField } from './entity-field.decorator';
import { convertEntityId } from '../util/functions';

@EntityClass({ endpoint: 'users' })
export class User implements Entity {

  @EntityField({ convert: convertEntityId })
  id: string;

  @EntityField({ convert: Date.parse })
  createdAt: Date;

  @EntityField({ convert: Date.parse })
  updatedAt: Date;

  @EntityField()
  email: string;

  @EntityField()
  firstName: string;

  @EntityField()
  lastName: string;

}
