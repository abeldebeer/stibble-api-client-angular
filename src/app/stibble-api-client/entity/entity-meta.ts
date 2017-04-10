

export interface EntityMetaData {
  endpoint: string;
}

export function EntityMeta(annotation: EntityMetaData) {
  return function (target: Function) {
    const entity: string = target.name;
    const endpoint: string = annotation.endpoint;

    console.log({ entity, endpoint });

    // const parentTarget = Object.getPrototypeOf(target.prototype).constructor;
    // const parentAnnotations = Reflect.getMetadata('annotations', parentTarget);
    // const parentParamTypes = Reflect.getMetadata('design:paramtypes', parentTarget);
    // const parentPropMetadata = Reflect.getMetadata('propMetadata', parentTarget);
    // const parentParameters = Reflect.getMetadata('parameters', parentTarget);
  };
}
