import { describe, expect, test } from 'vitest';
import { toTrimmed } from './toTrimmed.js';

describe('toTrimmed', () => {
  test('should transform to trimmed', () => {
    const transform = toTrimmed();
    expect(transform(' test    ')).toBe('test');
  });
});
