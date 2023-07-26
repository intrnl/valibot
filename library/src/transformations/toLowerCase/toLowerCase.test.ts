import { describe, expect, test } from 'vitest';
import { toLowerCase } from './toLowerCase.js';

describe('toLowerCase', () => {
  test('should transform to lower case', () => {
    const transform = toLowerCase();
    expect(transform('TeSt')).toBe('test');
  });
});
