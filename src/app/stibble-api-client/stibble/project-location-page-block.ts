import { Entity } from '../entity/entity';
import { ContentBlock } from './../entity/content-block';
import { EntityClass, EntityField } from '../entity/entity-decorators';
import { EntityFieldFlags as Flag } from '../entity/entity-metadata';
import { normalizeId, idToIri } from '../util/functions';

@EntityClass({ endpoint: 'project-location-page-blocks' })
export class ProjectLocationPageBlock implements ContentBlock {

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
    entity: 'ProjectLocationPage',
    flags: [Flag.REQUIRED, Flag.NO_UPDATE]
  })
  parent: string | Entity;

  @EntityField({ flags: [Flag.REQUIRED] })
  blockIndex: number;

  @EntityField({ flags: [Flag.REQUIRED] })
  type: string;

  @EntityField()
  value: any;

}
