import { describe, expect, test } from 'vitest';
import { comparable } from '../../utils/index.js';
import { object, optional, string } from '../../schemas/index.js';
import { parse } from '../parse/index.js';
import { partial } from './partial.js';

describe('partial', () => {
  test('should have optional keys', () => {
    const schema = partial(object({ key1: string(), key2: string() }));
    expect(schema).toEqual(
      comparable(object({ key1: optional(string()), key2: optional(string()) }))
    );
    const input = { key1: 'test' };
    const output = parse(schema, input);
    expect(output).toEqual(input);
  });

  test('should throw custom error', () => {
    const error = 'Value is not an object!';
    const schema = partial(object({ key1: string(), key2: string() }), error);
    expect(() => parse(schema, 123)).toThrowError(error);
  });

  test('should execute pipe', () => {
    const input = {};
    const transformInput = () => ({ key1: '1' });
    const output1 = parse(
      partial(object({ key1: string() }), [transformInput]),
      input
    );
    const output2 = parse(
      partial(object({ key1: string() }), 'Error', [transformInput]),
      input
    );
    expect(output1).toEqual(transformInput());
    expect(output2).toEqual(transformInput());
  });
});
