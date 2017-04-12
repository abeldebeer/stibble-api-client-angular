import { OwnedEntity } from '../entity/owned-entity';
import { EntityClass, EntityField } from '../entity/entity-decorators';
import { convertEntityId } from '../util/functions';

@EntityClass({ endpoint: 'project-locations' })
export class ProjectLocation implements OwnedEntity {

  @EntityField({ convert: convertEntityId })
  id: string;

  @EntityField({ convert: Date.parse })
  createdAt: Date;

  @EntityField({ convert: Date.parse })
  updatedAt: Date;

  @EntityField()
  owner: string;

  @EntityField()
  title: string;

  @EntityField()
  description: string;

  @EntityField()
  imageSrc: string;

  @EntityField()
  latitude: string;

  @EntityField()
  longitude: string;

  @EntityField()
  beacon: string;

  @EntityField()
  parent: string;

  @EntityField()
  pages: Array<string>;

}
