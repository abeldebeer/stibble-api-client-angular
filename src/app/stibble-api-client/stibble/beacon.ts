import { User } from './user';
import { OwnedEntity } from '../entity/owned-entity';
import { EntityClass, EntityField } from '../entity/entity-decorators';
import { EntityFieldFlags as Flag } from '../entity/entity-metadata';
import { convertEntityId } from '../util/functions';

@EntityClass({ endpoint: 'beacons' })
export class Beacon implements OwnedEntity {

  @EntityField({ convert: convertEntityId, flags: [Flag.IMMUTABLE] })
  id: string;

  @EntityField({ convert: Date.parse, flags: [Flag.IMMUTABLE] })
  createdAt: Date;

  @EntityField({ convert: Date.parse, flags: [Flag.IMMUTABLE] })
  updatedAt: Date;

  @EntityField({ entity: User, flags: [Flag.IMMUTABLE] })
  owner: string;

  @EntityField({ flags: [Flag.REQUIRED] })
  name: string;

}
