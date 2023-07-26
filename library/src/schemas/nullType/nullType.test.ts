import { describe, expect, test } from 'vitest';
import { parse } from '../../methods/index.js';
import { nullType } from './nullType.js';

describe('nullType', () => {
  test('should pass only null', () => {
    const schema = nullType();
    expect(parse(schema, null)).toBeNull();
    expect(() => parse(schema, 123)).toThrowError();
    expect(() => parse(schema, '123')).toThrowError();
    expect(() => parse(schema, false)).toThrowError();
    expect(() => parse(schema, undefined)).toThrowError();
    expect(() => parse(schema, {})).toThrowError();
  });

  test('should throw custom error', () => {
    const error = 'Value is not null!';
    expect(() => parse(nullType(error), 123)).toThrowError(error);
  });
});
