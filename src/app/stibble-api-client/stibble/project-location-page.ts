import { ProjectLocationPageBlock } from './project-location-page-block';
import { ProjectLocation } from './project-location';
import { User } from './user';
import { OwnedEntity } from '../entity/owned-entity';
import { EntityClass, EntityField } from '../entity/entity-decorators';
import { EntityFieldFlags as Flag } from '../entity/entity-metadata';
import { normalizeId, idToIri } from '../util/functions';

@EntityClass({ endpoint: 'project-location-pages' })
export class ProjectLocationPage implements OwnedEntity {

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
    entity: ProjectLocation,
    flags: [Flag.IMMUTABLE, Flag.REQUIRED]
  })
  parent: string;

  @EntityField({ entity: ProjectLocationPageBlock, flags: [Flag.IMMUTABLE] })
  blocks: Array<string>;

  @EntityField({ flags: [Flag.REQUIRED] })
  name: string;

  @EntityField({ flags: [Flag.REQUIRED] })
  template: string;

}
