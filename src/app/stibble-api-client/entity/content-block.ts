import { OwnedEntity } from './owned-entity';

/**
 * Type with basic properties for a content block.
 */
export interface ContentBlock extends OwnedEntity {

  /**
   * Index of the content block.
   */
  blockIndex: number;

  /**
   * Type of the content block.
   */
  type: string;

  /**
   * Value of the content block.
   */
  value: any;

}
