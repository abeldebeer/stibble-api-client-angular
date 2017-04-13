import { Entity } from '../entity/entity';
import { EntityClass, EntityField } from '../entity/entity-decorators';
import { EntityFieldFlags as Flag } from '../entity/entity-metadata';
import { normalizeId } from '../util/functions';

@EntityClass({ endpoint: 'users' })
export class User implements Entity {

  @EntityField({ deserialize: normalizeId, flags: [Flag.IMMUTABLE] })
  id: string;

  @EntityField({ deserialize: Date.parse, flags: [Flag.IMMUTABLE] })
  createdAt: Date;

  @EntityField({ deserialize: Date.parse, flags: [Flag.IMMUTABLE] })
  updatedAt: Date;

  @EntityField({ flags: [Flag.IMMUTABLE] })
  owner: string;

  @EntityField({ flags: [Flag.IMMUTABLE] })
  email: string;

  @EntityField({ flags: [Flag.IMMUTABLE] })
  firstName: string;

  @EntityField({ flags: [Flag.IMMUTABLE] })
  lastName: string;

}
