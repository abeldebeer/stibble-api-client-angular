import { Entity } from '../entity/entity';
import { EntityClass, EntityField } from '../entity/entity-decorators';
import { EntityFieldFlags as Flag } from '../entity/entity-metadata';
import { OwnedEntity } from '../entity/owned-entity';
import { idToIri, normalizeId } from '../util/functions';
import { PublicationStatus } from './publication-status';

/**
 * Project map type.
 */
export type MapType = 'GOOGLE_OUTDOOR' | 'IMAGE';

@EntityClass({ endpoint: 'projects' })
export class Project implements OwnedEntity {

  // -----------------------------------------------------------------------------------------------
  // PROPERTIES INHERITED FROM INTERFACES
  // -----------------------------------------------------------------------------------------------

  @EntityField({ deserialize: normalizeId, flags: [Flag.GENERATED] })
  id: string;

  @EntityField({ deserialize: Date.parse, flags: [Flag.GENERATED] })
  createdAt: Date;

  @EntityField({ deserialize: Date.parse, flags: [Flag.GENERATED] })
  updatedAt: Date;

  @EntityField({ entity: 'User', flags: [Flag.GENERATED] })
  owner: string | Entity;

  // -----------------------------------------------------------------------------------------------
  // PROPERTIES
  // -----------------------------------------------------------------------------------------------

  @EntityField({ flags: [Flag.REQUIRED] })
  title: string;

  @EntityField()
  subTitle: string;

  @EntityField()
  imageSrc: string;

  @EntityField()
  introductionText: string;

  @EntityField({ flags: [Flag.REQUIRED] })
  mapType: MapType;

  @EntityField()
  publicationStatus: PublicationStatus;

  @EntityField({
    serialize: idToIri,
    entity: 'App',
    flags: [Flag.REQUIRED, Flag.NO_UPDATE]
  })
  parent: string | Entity;

  @EntityField({ entity: 'ProjectLocation', flags: [Flag.GENERATED] })
  locations: Array<string | Entity> = [];

  @EntityField({ entity: 'ProjectInfoBlock', flags: [Flag.GENERATED] })
  infoBlocks: Array<string | Entity> = [];

}
