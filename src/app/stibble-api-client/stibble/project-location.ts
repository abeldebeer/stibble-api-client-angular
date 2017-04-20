import { Entity } from '../entity/entity';
import { OwnedEntity } from '../entity/owned-entity';
import { EntityClass, EntityField } from '../entity/entity-decorators';
import { EntityFieldFlags as Flag } from '../entity/entity-metadata';
import { normalizeId, idToIri } from '../util/functions';

@EntityClass({ endpoint: 'project-locations' })
export class ProjectLocation implements OwnedEntity {

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
    entity: 'Project',
    flags: [Flag.REQUIRED, Flag.NO_UPDATE]
  })
  parent: string | Entity;

  @EntityField({ entity: 'ProjectLocationPage', flags: [Flag.GENERATED] })
  pages: Array<string | Entity>;

  @EntityField({ serialize: idToIri, entity: 'Beacon' })
  beacon: string | Entity;

  @EntityField({ flags: [Flag.REQUIRED] })
  title: string;

  @EntityField()
  description: string;

  @EntityField()
  imageSrc: string;

  @EntityField()
  latitude: string;

  @EntityField()
  longitude: string;

}
