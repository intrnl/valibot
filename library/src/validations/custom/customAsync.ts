import { ValiError } from '../../error/index.js';
import type { ValidateInfo } from '../../types.js';

/**
 * Creates a async custom validation function.
 *
 * @param requirement The async validation function.
 * @param error The error message.
 *
 * @returns A async validation function.
 */
export function customAsync<TInput>(
  requirement: (input: TInput) => Promise<boolean>,
  error?: string
) {
  return async (input: TInput, info: ValidateInfo) => {
    if (!(await requirement(input))) {
      throw new ValiError([
        {
          validation: 'custom',
          origin: 'value',
          message: error || 'Invalid input',
          input,
          ...info,
        },
      ]);
    }
    return input;
  };
}
