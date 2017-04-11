import { OwnedEntity } from './owned-entity';
import { Entity } from './entity';
import { EntityClass } from './entity-class.decorator';

@EntityClass({ endpoint: 'apps' })
export class App implements OwnedEntity {

  readonly id: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly owner: string;

}
