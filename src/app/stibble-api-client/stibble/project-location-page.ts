import { Entity } from '../entity/entity';
import { EntityClass, EntityField } from '../entity/entity-decorators';
import { EntityFieldFlags as Flag } from '../entity/entity-metadata';
import { OwnedEntity } from '../entity/owned-entity';
import { idToIri, normalizeId } from '../util/functions';

@EntityClass({ endpoint: 'project-location-pages' })
export class ProjectLocationPage implements OwnedEntity {

  @EntityField({ deserialize: normalizeId, flags: [Flag.GENERATED] })
  id: string;

  @EntityField({ deserialize: Date.parse, flags: [Flag.GENERATED] })
  createdAt: Date;

  @EntityField({ deserialize: Date.parse, flags: [Flag.GENERATED] })
  updatedAt: Date;

  @EntityField({ entity: 'User', flags: [Flag.GENERATED] })
  owner: string | Entity;

  @EntityField({
    serialize: idToIri,
    entity: 'ProjectLocation',
    flags: [Flag.REQUIRED, Flag.NO_UPDATE]
  })
  parent: string | Entity;

  @EntityField({ entity: 'ProjectLocationPageBlock', flags: [Flag.GENERATED] })
  contentBlocks: Array<string | Entity> = [];

  @EntityField({ flags: [Flag.REQUIRED] })
  name: string;

  @EntityField({ flags: [Flag.REQUIRED] })
  template: string;

}
