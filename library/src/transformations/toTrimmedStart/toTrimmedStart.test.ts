import { describe, expect, test } from 'vitest';
import { toTrimmedStart } from './toTrimmedStart.js';

describe('toTrimmedStart', () => {
  test('should transform to trimmed start', () => {
    const transform = toTrimmedStart();
    expect(transform(' test    ')).toBe('test    ');
  });
});
