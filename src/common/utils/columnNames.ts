// Note: These functions are not intended to handle edge cases
function snakeToCamelCase(str: string): string {
  return str.split('').reduce((prev, curr) => {
    if (prev.slice(-1) === '_') {
      return prev.slice(0, -1) + curr.toUpperCase();
    }
    return prev + curr;
  });
}

export function camelToSnakeCase(str: string): string {
  return str.split('').reduce((prev, curr) => {
    if (curr === curr.toUpperCase()) {
      return prev + '_' + curr.toLowerCase();
    }
    return prev + curr;
  });
}

export function snakeToCamelKeys(
  record: Record<string, unknown>,
): Record<string, unknown> {
  return Object.keys(record).reduce(
    (prev, curr) => ({
      ...prev,
      ...{ [snakeToCamelCase(curr)]: record[curr] },
    }),
    {},
  );
}
