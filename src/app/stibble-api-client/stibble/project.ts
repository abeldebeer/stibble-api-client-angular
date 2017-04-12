import { OwnedEntity } from '../entity/owned-entity';
import { EntityClass, EntityField } from '../entity/entity-decorators';
import { EntityFieldFlags as Flag } from '../entity/entity-metadata';
import { convertEntityId } from '../util/functions';

export type MapType = 'GOOGLE_OUTDOOR' | 'IMAGE';

@EntityClass({ endpoint: 'projects' })
export class Project implements OwnedEntity {

  @EntityField({ flags: [Flag.IMMUTABLE] })
  iri: string;

  @EntityField({ convert: convertEntityId, flags: [Flag.IMMUTABLE] })
  id: string;

  @EntityField({ convert: Date.parse, flags: [Flag.IMMUTABLE] })
  createdAt: Date;

  @EntityField({ convert: Date.parse, flags: [Flag.IMMUTABLE] })
  updatedAt: Date;

  @EntityField({ flags: [Flag.IMMUTABLE] })
  owner: string;

  @EntityField({ flags: [Flag.IMMUTABLE, Flag.REQUIRED] })
  parent: string;

  @EntityField({ flags: [Flag.IMMUTABLE] })
  locations: Array<string>;

  @EntityField({ flags: [Flag.REQUIRED] })
  title: string;

  @EntityField({ flags: [Flag.REQUIRED] })
  mapType: MapType;

  @EntityField()
  subTitle: string;

  @EntityField()
  imageSrc: string;

  @EntityField()
  introductionText: string;

}
