import { describe, expect, test } from 'vitest';
import { parse } from '../../methods/index.js';
import { string } from '../string/index.js';
import { nullable } from './nullable.js';

describe('nullable', () => {
  test('should pass also null', () => {
    const schema = nullable(string());
    const input = 'test';
    const output = parse(schema, input);
    expect(output).toBe(input);
    expect(parse(schema, null)).toBeNull();
    expect(() => parse(schema, 123)).toThrowError();
    expect(() => parse(schema, false)).toThrowError();
    expect(() => parse(schema, undefined)).toThrowError();
    expect(() => parse(schema, {})).toThrowError();
  });
});
