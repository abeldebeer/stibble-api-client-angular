import { OwnedEntity } from './owned-entity';
import { Entity } from './entity';
import { EntityClass } from './entity-class.decorator';

@EntityClass({ endpoint: 'projects' })
export class Project implements OwnedEntity {

  readonly id: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly owner: string;

}
