import { describe, expect, test } from 'vitest';
import { size } from './size.js';

describe('size', () => {
  const info = { reason: 'any' as const };

  test('should pass only valid sizes', () => {
    const validate = size(2);

    const value1 = new Map().set(1, 1).set(2, 2);
    expect(validate(value1, info)).toBe(value1);
    const value2 = new Set().add(1).add(2);
    expect(validate(value2, info)).toEqual(value2);

    expect(() => validate(new Map(), info)).toThrowError();
    expect(() => validate(new Set().add(1), info)).toThrowError();
    expect(() => validate(new Set().add(1).add(2).add(3), info)).toThrowError();
  });

  test('should throw custom error', () => {
    const error = 'Value size is not "2"!';
    const value = new Set().add(1);
    const validate = size(2, error);
    expect(() => validate(value, info)).toThrowError(error);
  });
});
