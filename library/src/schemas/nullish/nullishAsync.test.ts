import { describe, expect, test } from 'vitest';
import { parseAsync } from '../../methods/index.js';
import { string } from '../string/index.js';
import { nullishAsync } from './nullishAsync.js';

describe('nullishAsync', () => {
  test('should pass also null and undefined', async () => {
    const schema = nullishAsync(string());
    const input = 'test';
    const output = await parseAsync(schema, input);
    expect(output).toBe(input);
    expect(await parseAsync(schema, null)).toBeNull();
    expect(await parseAsync(schema, undefined)).toBeUndefined();
    await expect(parseAsync(schema, 123)).rejects.toThrowError();
    await expect(parseAsync(schema, false)).rejects.toThrowError();
    await expect(parseAsync(schema, {})).rejects.toThrowError();
  });
});
