import { describe, expect, test } from 'vitest';
import { parseAsync } from '../../methods/index.js';
import { minLength } from '../../validations/index.js';
import { stringAsync } from '../string/index.js';
import { recursiveAsync } from './recursiveAsync.js';

describe('recursiveAsync', () => {
  test('should pass only getter schema', async () => {
    const schema = recursiveAsync(() => stringAsync([minLength(3)]));
    const input = 'hello';
    const output = await parseAsync(schema, input);
    expect(output).toBe(input);
    await expect(parseAsync(schema, 'he')).rejects.toThrowError();
    await expect(parseAsync(schema, 123n)).rejects.toThrowError();
    await expect(parseAsync(schema, null)).rejects.toThrowError();
    await expect(parseAsync(schema, {})).rejects.toThrowError();
  });
});
