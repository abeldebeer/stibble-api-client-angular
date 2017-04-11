export function toString(value: any): string {
  return value ? value.toString() : value;
}

export function convertEntityId(value: any): string {
  return toString(value);
}
