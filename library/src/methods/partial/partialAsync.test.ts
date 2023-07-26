import { describe, expect, test } from 'vitest';
import { comparable } from '../../utils/index.js';
import { object, objectAsync, optionalAsync, string } from '../../schemas/index.js';
import { parseAsync } from '../parse/index.js';
import { partialAsync } from './partialAsync.js';

describe('partialAsync', () => {
  test('should have optional keys', async () => {
    const schema = partialAsync(
      objectAsync({ key1: string(), key2: string() })
    );
    expect(schema).toEqual(
      comparable(
        objectAsync({
          key1: optionalAsync(string()),
          key2: optionalAsync(string()),
        })
      )
    );
    const input = { key1: 'test' };
    const output = await parseAsync(schema, input);
    expect(output).toEqual(input);
  });

  test('should throw custom error', async () => {
    const error = 'Value is not an object!';
    const schema = partialAsync(
      object({ key1: string(), key2: string() }),
      error
    );
    await expect(parseAsync(schema, 123)).rejects.toThrowError(error);
  });

  test('should execute pipe', async () => {
    const input = {};
    const transformInput = () => ({ key1: '1' });
    const output1 = await parseAsync(
      partialAsync(object({ key1: string() }), [transformInput]),
      input
    );
    const output2 = await parseAsync(
      partialAsync(object({ key1: string() }), 'Error', [transformInput]),
      input
    );
    expect(output1).toEqual(transformInput());
    expect(output2).toEqual(transformInput());
  });
});
