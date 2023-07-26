import { describe, expect, test } from 'vitest';
import { parse } from '../../methods/index.js';
import { string } from '../string/index.js';
import { nullish } from './nullish.js';

describe('nullish', () => {
  test('should pass also null and undefined', () => {
    const schema = nullish(string());
    const input = 'test';
    const output = parse(schema, input);
    expect(output).toBe(input);
    expect(parse(schema, null)).toBeNull();
    expect(parse(schema, undefined)).toBeUndefined();
    expect(() => parse(schema, 123)).toThrowError();
    expect(() => parse(schema, false)).toThrowError();
    expect(() => parse(schema, {})).toThrowError();
  });
});
