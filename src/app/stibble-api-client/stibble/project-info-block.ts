import { ContentBlock } from './../entity/content-block';
import { Project } from './project';
import { User } from './user';
import { EntityClass, EntityField } from '../entity/entity-decorators';
import { EntityFieldFlags as Flag } from '../entity/entity-metadata';
import { normalizeId, idToIri } from '../util/functions';

@EntityClass({ endpoint: 'project-info-blocks' })
export class ProjectInfoBlock implements ContentBlock {

  @EntityField({ deserialize: normalizeId, flags: [Flag.IMMUTABLE] })
  id: string;

  @EntityField({ deserialize: Date.parse, flags: [Flag.IMMUTABLE] })
  createdAt: Date;

  @EntityField({ deserialize: Date.parse, flags: [Flag.IMMUTABLE] })
  updatedAt: Date;

  @EntityField({ entity: User, flags: [Flag.IMMUTABLE] })
  owner: string;

  @EntityField({
    serialize: idToIri,
    entity: Project, flags:
    [Flag.IMMUTABLE, Flag.REQUIRED]
  })
  parent: string;

  @EntityField({ flags: [Flag.REQUIRED] })
  blockIndex: number;

  @EntityField({ flags: [Flag.REQUIRED] })
  type: string;

  @EntityField()
  value: any;

}
