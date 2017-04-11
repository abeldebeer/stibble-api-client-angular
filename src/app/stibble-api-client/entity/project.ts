import { OwnedEntity } from './owned-entity';
import { EntityClass } from './entity-class.decorator';
import { EntityField } from './entity-field.decorator';
import { convertEntityId } from '../util/functions';

@EntityClass({ endpoint: 'projects' })
export class Project implements OwnedEntity {

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
  subTitle: string;

  @EntityField()
  imageSrc: string;

  @EntityField()
  introductionText: string;

  @EntityField()
  mapType: string;

  @EntityField()
  app: string;

  @EntityField()
  locations: Array<string>;

}
