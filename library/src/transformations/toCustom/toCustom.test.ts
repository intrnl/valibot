import { describe, expect, test } from 'vitest';
import { toCustom } from './toCustom.js';

describe('toCustom', () => {
  test('should transform the custom', () => {
    const transform1 = toCustom<string>((input) => input.trim());
    expect(transform1(' test ')).toBe('test');
    const transform2 = toCustom<number>((input) => input + 1);
    expect(transform2(1)).toBe(2);
  });
});
