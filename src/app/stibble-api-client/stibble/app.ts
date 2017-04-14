import { EntityFieldMetadata } from './../entity/entity-metadata';
import { AppInfoBlock } from './app-info-block';
import { Project } from './project';
import { User } from './user';
import { OwnedEntity } from '../entity/owned-entity';
import { EntityClass, EntityField } from '../entity/entity-decorators';
import { EntityFieldFlags as Flag } from '../entity/entity-metadata';
import { normalizeId } from '../util/functions';

@EntityClass({ endpoint: 'apps' })
export class App implements OwnedEntity {

  @EntityField({ deserialize: normalizeId, flags: [Flag.GENERATED] })
  id: string;

  @EntityField({ deserialize: Date.parse, flags: [Flag.GENERATED] })
  createdAt: Date;

  @EntityField({ deserialize: Date.parse, flags: [Flag.GENERATED] })
  updatedAt: Date;

  @EntityField({ entity: User, flags: [Flag.GENERATED] })
  owner: string;

  @EntityField({ entity: Project, flags: [Flag.GENERATED] })
  projects: Array<string>;

  @EntityField({ entity: AppInfoBlock, flags: [Flag.GENERATED] })
  info: Array<string>;

  @EntityField({ flags: [Flag.REQUIRED] })
  title: string;

  @EntityField()
  subTitle: string;

}
