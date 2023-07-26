import { describe, expect, test } from 'vitest';
import { object, string } from '../../schemas/index.js';
import { parse } from '../parse/index.js';
import { transform } from './transform.js';

describe('transform', () => {
  test('should transform string to number', () => {
    const schema = transform(string(), (output) => output.length);
    const output = parse(schema, 'hello');
    expect(output).toBe(5);
  });

  test('should add key to object', () => {
    const schema = transform(object({ key1: string() }), (output) => ({
      ...output,
      key2: 'test',
    }));
    const input = { key1: 'hello' };
    const output = parse(schema, input);
    expect(output).toEqual({ ...input, key2: 'test' });
  });
});
