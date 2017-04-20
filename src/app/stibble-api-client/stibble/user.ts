import { Entity } from '../entity/entity';
import { EntityClass, EntityField } from '../entity/entity-decorators';
import { EntityFieldFlags as Flag } from '../entity/entity-metadata';
import { normalizeId } from '../util/functions';

@EntityClass({ endpoint: 'users' })
export class User implements Entity {

  @EntityField({ deserialize: normalizeId, flags: [Flag.GENERATED] })
  id: string;

  @EntityField({ deserialize: Date.parse, flags: [Flag.GENERATED] })
  createdAt: Date;

  @EntityField({ deserialize: Date.parse, flags: [Flag.GENERATED] })
  updatedAt: Date;

  @EntityField({ flags: [Flag.NO_UPDATE] })
  email: string;

  @EntityField({ flags: [Flag.NO_UPDATE] })
  firstName: string;

  @EntityField({ flags: [Flag.NO_UPDATE] })
  lastName: string;

}
