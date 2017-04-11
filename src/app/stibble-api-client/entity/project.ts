import { OwnedEntity } from './owned-entity';
import { Entity } from './entity';
import { EntityClass } from './entity-class.decorator';
import { EntityField } from './entity-field.decorator';

@EntityClass({ endpoint: 'projects' })
export class Project implements OwnedEntity {

  @EntityField()
  id: number;

  @EntityField({ type: Date })
  createdAt: Date;

  @EntityField({ type: Date })
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
