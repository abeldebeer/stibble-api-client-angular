import { User } from './user';
import { OwnedEntity } from '../entity/owned-entity';
import { EntityClass, EntityField } from '../entity/entity-decorators';
import { EntityFieldFlags as Flag } from '../entity/entity-metadata';
import { normalizeId } from '../util/functions';

@EntityClass({ endpoint: 'beacons' })
export class Beacon implements OwnedEntity {

  @EntityField({ deserialize: normalizeId, flags: [Flag.IMMUTABLE] })
  id: string;

  @EntityField({ deserialize: Date.parse, flags: [Flag.IMMUTABLE] })
  createdAt: Date;

  @EntityField({ deserialize: Date.parse, flags: [Flag.IMMUTABLE] })
  updatedAt: Date;

  @EntityField({ entity: User, flags: [Flag.IMMUTABLE] })
  owner: string;

  @EntityField({ flags: [Flag.REQUIRED] })
  name: string;

}
