import { EntityField } from './entity-field.decorator';
import { OwnedEntity } from './owned-entity';
import { Entity } from './entity';
import { EntityClass } from './entity-class.decorator';

@EntityClass({ endpoint: 'apps' })
export class App implements OwnedEntity {

  @EntityField()
  id: string;

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
  projects: Array<string>;

}
