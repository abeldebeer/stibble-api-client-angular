import { Entity } from '../entity/entity';
import { EntityClass, EntityField } from '../entity/entity-decorators';
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
