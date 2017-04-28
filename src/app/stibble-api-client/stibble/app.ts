import { Entity } from '../entity/entity';
import { EntityClass, EntityField } from '../entity/entity-decorators';
import { EntityFieldFlags as Flag } from '../entity/entity-metadata';
import { OwnedEntity } from '../entity/owned-entity';
import { normalizeId } from '../util/functions';
import { PublicationStatus } from './publication-status';

@EntityClass({ endpoint: 'apps' })
export class App implements OwnedEntity {

  // -----------------------------------------------------------------------------------------------
  // PROPERTIES INHERITED FROM INTERFACES
  // -----------------------------------------------------------------------------------------------

  @EntityField({ deserialize: normalizeId, flags: [Flag.GENERATED] })
  id: string;

  @EntityField({ deserialize: Date.parse, flags: [Flag.GENERATED] })
  createdAt: Date;

  @EntityField({ deserialize: Date.parse, flags: [Flag.GENERATED] })
  updatedAt: Date;

  @EntityField({ entity: 'User', flags: [Flag.GENERATED] })
  owner: string | Entity;

  // -----------------------------------------------------------------------------------------------
  // PROPERTIES
  // -----------------------------------------------------------------------------------------------

  @EntityField({ flags: [Flag.REQUIRED] })
  title: string;

  @EntityField()
  subTitle: string;

  @EntityField()
  publicationStatus: PublicationStatus;

  @EntityField({ entity: 'Project', flags: [Flag.GENERATED] })
  projects: Array<string | Entity> = [];

  @EntityField({ entity: 'AppInfoBlock', flags: [Flag.GENERATED] })
  infoBlocks: Array<string | Entity> = [];

}
