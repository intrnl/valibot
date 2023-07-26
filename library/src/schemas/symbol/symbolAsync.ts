import { ValiError } from '../../error/index.js';
import type { BaseSchemaAsync } from '../../types.js';

/**
 * Symbol schema async type.
 */
export type SymbolSchemaAsync<TOutput = symbol> = BaseSchemaAsync<
  symbol,
  TOutput
> & {
  schema: 'symbol';
};

/**
 * Creates an async symbol schema.
 *
 * @param error The error message.
 *
 * @returns An async symbol schema.
 */
export function symbolAsync(error?: string): SymbolSchemaAsync {
  return {
    /**
     * The schema type.
     */
    schema: 'symbol',

    /**
     * Whether it's async.
     */
    async: true,

    /**
     * Parses unknown input based on its schema.
     *
     * @param input The input to be parsed.
     * @param info The parse info.
     *
     * @returns The parsed output.
     */
    async parse(input, info) {
      // Check type of input
      if (typeof input !== 'symbol') {
        throw new ValiError([
          {
            reason: 'type',
            validation: 'symbol',
            origin: 'value',
            message: error || 'Invalid type',
            input,
            ...info,
          },
        ]);
      }

      // Return output
      return input;
    },
  };
}
