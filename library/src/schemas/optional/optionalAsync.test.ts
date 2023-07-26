import { describe, expect, test } from 'vitest';
import { parseAsync } from '../../methods/index.js';
import { string } from '../string/index.js';
import { optionalAsync } from './optionalAsync.js';

describe('optionalAsync', () => {
  test('should pass also undefined', async () => {
    const schema = optionalAsync(string());
    const input = 'test';
    const output = await parseAsync(schema, input);
    expect(output).toBe(input);
    expect(await parseAsync(schema, undefined)).toBeUndefined();
    await expect(parseAsync(schema, 123)).rejects.toThrowError();
    await expect(parseAsync(schema, false)).rejects.toThrowError();
    await expect(parseAsync(schema, null)).rejects.toThrowError();
    await expect(parseAsync(schema, {})).rejects.toThrowError();
  });
});
