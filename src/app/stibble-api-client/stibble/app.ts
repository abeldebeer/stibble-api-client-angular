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

  @EntityField({ deserialize: normalizeId, flags: [Flag.IMMUTABLE] })
  id: string;

  @EntityField({ deserialize: Date.parse, flags: [Flag.IMMUTABLE] })
  createdAt: Date;

  @EntityField({ deserialize: Date.parse, flags: [Flag.IMMUTABLE] })
  updatedAt: Date;

  @EntityField({ entity: User, flags: [Flag.IMMUTABLE] })
  owner: string;

  @EntityField({ entity: Project, flags: [Flag.IMMUTABLE] })
  projects: Array<string>;

  @EntityField({ entity: AppInfoBlock, flags: [Flag.IMMUTABLE] })
  info: Array<string>;

  @EntityField({ flags: [Flag.REQUIRED] })
  title: string;

  @EntityField()
  subTitle: string;

}
