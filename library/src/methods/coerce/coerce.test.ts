import { describe, expect, test } from 'vitest';
import { date, number, string } from '../../schemas/index.js';
import { parse } from '../parse/index.js';
import { coerce } from './coerce.js';

describe('coerce', () => {
  test('should coerce number to string', () => {
    const output = parse(coerce(string(), String), 5);
    expect(output).toBe('5');
  });

  test('should coerce string to number', () => {
    const output = parse(coerce(number(), Number), '5');
    expect(output).toBe(5);
  });

  test('should coerce number to date', () => {
    const time = 1688902224413;
    const output = parse(
      coerce(date(), (input) => new Date(input as any)),
      time
    );
    expect(output).toBeInstanceOf(Date);
    expect(output.getTime()).toBe(time);
  });
});
