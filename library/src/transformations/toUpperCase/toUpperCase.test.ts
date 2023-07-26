import { describe, expect, test } from 'vitest';
import { toUpperCase } from './toUpperCase.js';

describe('toUpperCase', () => {
  test('should transform to upper case', () => {
    const transform = toUpperCase();
    expect(transform('TeSt')).toBe('TEST');
  });
});
