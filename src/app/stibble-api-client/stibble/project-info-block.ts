import { ContentBlock } from './../entity/content-block';
import { Project } from './project';
import { User } from './user';
import { EntityClass, EntityField } from '../entity/entity-decorators';
import { EntityFieldFlags as Flag } from '../entity/entity-metadata';
import { normalizeId, idToIri } from '../util/functions';

@EntityClass({ endpoint: 'project-info-blocks' })
export class ProjectInfoBlock implements ContentBlock {

  @EntityField({ deserialize: normalizeId, flags: [Flag.GENERATED] })
  id: string;

  @EntityField({ deserialize: Date.parse, flags: [Flag.GENERATED] })
  createdAt: Date;

  @EntityField({ deserialize: Date.parse, flags: [Flag.GENERATED] })
  updatedAt: Date;

  @EntityField({ entity: User, flags: [Flag.GENERATED] })
  owner: string;

  @EntityField({
    serialize: idToIri,
    entity: Project, flags:
    [Flag.NO_UPDATE, Flag.REQUIRED]
  })
  parent: string;

  @EntityField({ flags: [Flag.REQUIRED] })
  blockIndex: number;

  @EntityField({ flags: [Flag.REQUIRED] })
  type: string;

  @EntityField()
  value: any;

}
