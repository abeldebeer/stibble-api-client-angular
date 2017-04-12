import { OwnedEntity } from '../entity/owned-entity';
import { EntityClass, EntityField } from '../entity/entity-decorators';
import { EntityFieldFlags as Flag } from '../entity/entity-metadata';
import { convertEntityId } from '../util/functions';

@EntityClass({ endpoint: 'apps' })
export class App implements OwnedEntity {

  @EntityField({ flags: [Flag.IMMUTABLE] })
  iri: string;

  @EntityField({ convert: convertEntityId, flags: [Flag.IMMUTABLE] })
  id: string;

  @EntityField({ convert: Date.parse, flags: [Flag.IMMUTABLE] })
  createdAt: Date;

  @EntityField({ convert: Date.parse, flags: [Flag.IMMUTABLE] })
  updatedAt: Date;

  @EntityField({ flags: [Flag.IMMUTABLE] })
  owner: string;

  @EntityField({ flags: [Flag.IMMUTABLE, Flag.REQUIRED] })
  parent: string;

  @EntityField({ flags: [Flag.IMMUTABLE] })
  projects: Array<string>;

  @EntityField({ flags: [Flag.REQUIRED] })
  title: string;

  @EntityField()
  subTitle: string;

}
