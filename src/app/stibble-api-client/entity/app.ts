import { OwnedEntity } from './owned-entity';
import { EntityMeta } from './entity-meta';
import { Entity } from './entity';

@EntityMeta({ endpoint: 'apps' })
export class App implements OwnedEntity {

  readonly id: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly owner: string;

}
