import type { BaseSchema, BaseSchemaAsync, Output } from '../../types.js';

/**
 * Parses unknown input based on a schema.
 *
 * @param schema The scheme to be used.
 * @param input The input to be parsed.
 *
 * @returns The parsed output.
 */
export async function parseAsync<TSchema extends BaseSchema | BaseSchemaAsync>(
  schema: TSchema,
  input: unknown
): Promise<Output<TSchema>> {
  return schema.parse(input);
}
