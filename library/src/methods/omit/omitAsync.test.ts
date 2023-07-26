import { describe, expect, test } from 'vitest';
import { comparable } from '../../utils/index.js';
import { object, objectAsync, string } from '../../schemas/index.js';
import { parseAsync } from '../parse/index.js';
import { omitAsync } from './omitAsync.js';

describe('omitAsync', () => {
  test('should omit two object keys', async () => {
    const schema = omitAsync(
      objectAsync({ key1: string(), key2: string(), key3: string() }),
      ['key1', 'key3']
    );
    expect(schema).toEqual(comparable(objectAsync({ key2: string() })));
    const input = { key2: 'test' };
    const output = await parseAsync(schema, input);
    expect(output).toEqual(input);
    await expect(parseAsync(schema, { key1: 'test' })).rejects.toThrowError();
  });

  test('should throw custom error', async () => {
    const error = 'Value is not an object!';
    const schema = omitAsync(
      object({ key1: string(), key2: string() }),
      ['key1'],
      error
    );
    await expect(parseAsync(schema, 123)).rejects.toThrowError(error);
  });

  test('should execute pipe', async () => {
    const input = { key2: '1' };
    const transformInput = () => ({ key2: '2' });
    const output1 = await parseAsync(
      omitAsync(
        objectAsync({ key1: string(), key2: string() }),
        ['key1'],
        [transformInput]
      ),
      input
    );
    const output2 = await parseAsync(
      omitAsync(object({ key1: string(), key2: string() }), ['key1'], 'Error', [
        transformInput,
      ]),
      input
    );
    expect(output1).toEqual(transformInput());
    expect(output2).toEqual(transformInput());
  });
});
