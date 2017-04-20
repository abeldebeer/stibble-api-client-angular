import { Entity } from './entity';
import { EntityClassMetadata, EntityFieldMetadata } from './entity-metadata';

export class EntityMetadataProvider {

  // -----------------------------------------------------------------------------------------------
  // PROPERTIES
  // -----------------------------------------------------------------------------------------------

  private static _classByName: Map<string, Function> = new Map();
  private static _classMetadata: Map<Function, EntityClassMetadata> = new Map();
  private static _fieldMetadata: Map<Function, Map<string, EntityFieldMetadata>> = new Map();

  // -----------------------------------------------------------------------------------------------
  // PUBLIC METHODS
  // -----------------------------------------------------------------------------------------------

  public static addClassMetadata(entityClass: Function, metadata: EntityClassMetadata): void {
    EntityMetadataProvider._classMetadata.set(entityClass, metadata);
    EntityMetadataProvider._classByName.set(entityClass.name, entityClass);
  }

  public static addFieldMetadata(entityClass: Function, propertyKey: string,
    metadata: EntityFieldMetadata): void {
    const map: Map<string, EntityFieldMetadata> =
      EntityMetadataProvider._fieldMetadata.get(entityClass) || new Map();

    map.set(propertyKey, metadata);

    EntityMetadataProvider._fieldMetadata.set(entityClass, map);
    EntityMetadataProvider._classByName.set(entityClass.name, entityClass);
  }

  public static getClassByName<T>(entityClass: string): { new (): T; } {
    const constructor: any = EntityMetadataProvider._classByName.get(entityClass);

    if (!constructor) {
      throw new Error(`No registered metadata for class '${entityClass}'`);
    }

    return constructor;
  }

  public static getClassMetadata(entityClass: string | Function): EntityClassMetadata {
    return EntityMetadataProvider._classMetadata.get(
      EntityMetadataProvider._getClassKey(entityClass)
    );
  }

  public static getFieldMetadata(entityClass: string | Function, propertyKey: string): EntityFieldMetadata {
    return EntityMetadataProvider._fieldMetadata.get(
      EntityMetadataProvider._getClassKey(entityClass)
    ).get(propertyKey);
  }

  public static getAllFieldMetadata(entityClass: string | Function): Map<string, EntityFieldMetadata> {
    return EntityMetadataProvider._fieldMetadata.get(
      EntityMetadataProvider._getClassKey(entityClass)
    );
  }

  // -----------------------------------------------------------------------------------------------
  // PRIVATE METHODS
  // -----------------------------------------------------------------------------------------------

  private static _getClassKey(name: string | Function): Function {
    return typeof name === 'function' ? name : EntityMetadataProvider.getClassByName(name);
  }

}
