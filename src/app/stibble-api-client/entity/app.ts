import { EntityField } from './entity-field.decorator';
import { OwnedEntity } from './owned-entity';
import { EntityClass } from './entity-class.decorator';
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
