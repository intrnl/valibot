import type { BaseSchemaAsync, Input } from '../../types.js';

/**
 * Coerces the input of a async scheme to match the required type.
 *
 * @param schema The affected scheme.
 * @param action The coerceation action.
 *
 * @returns The passed schema.
 */
export function coerceAsync<TSchema extends BaseSchemaAsync>(
  schema: TSchema,
  action: (value: unknown) => Input<TSchema> | Promise<Input<TSchema>>
): TSchema {
  return {
    ...schema,

    /**
     * Parses unknown input based on its schema.
     *
     * @param input The input to be parsed.
     * @param info The parse info.
     *
     * @returns The parsed output.
     */
    async parse(input, info) {
      return schema.parse(await action(input), info);
    },
  };
}
