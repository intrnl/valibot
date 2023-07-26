import { ValiError } from '../../error/index.js';
import type { BaseSchema } from '../../types.js';

/**
 * Never schema type.
 */
export type NeverSchema = BaseSchema<never> & {
  schema: 'never';
};

/**
 * Creates a never schema.
 *
 * @param error The error message.
 *
 * @returns A never schema.
 */
export function never(error?: string): NeverSchema {
  return {
    /**
     * The schema type.
     */
    schema: 'never',

    /**
     * Whether it's async.
     */
    async: false,

    /**
     * Parses unknown input based on its schema.
     *
     * @param input The input to be parsed.
     * @param info The parse info.
     *
     * @returns The parsed output.
     */
    parse(input, info) {
      throw new ValiError([
        {
          reason: 'type',
          validation: 'never',
          origin: 'value',
          message: error || 'Invalid type',
          input,
          ...info,
        },
      ]);
    },
  };
}
