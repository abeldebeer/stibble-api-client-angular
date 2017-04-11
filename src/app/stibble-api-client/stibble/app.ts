import { OwnedEntity } from '../entity/owned-entity';
import { EntityClass, EntityField } from '../entity/entity-decorators';
import { convertEntityId } from '../util/functions';

@EntityClass({ endpoint: 'apps' })
export class App implements OwnedEntity {

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
  projects: Array<string>;

}
