import { describe, expect, test } from 'vitest';
import { comparable } from '../../utils/index.js';
import { object, string } from '../../schemas/index.js';
import { omit } from '../omit/index.js';
import { parse } from '../parse/index.js';

describe('omit', () => {
  test('should omit two object keys', () => {
    const schema = omit(
      object({ key1: string(), key2: string(), key3: string() }),
      ['key1', 'key3']
    );
    expect(schema).toEqual(comparable(object({ key2: string() })));
    const input = { key2: 'test' };
    const output = parse(schema, input);
    expect(output).toEqual(input);
    expect(() => parse(schema, { key1: 'test' })).toThrowError();
  });

  test('should throw custom error', () => {
    const error = 'Value is not an object!';
    const schema = omit(
      object({ key1: string(), key2: string() }),
      ['key1'],
      error
    );
    expect(() => parse(schema, 123)).toThrowError(error);
  });

  test('should execute pipe', () => {
    const input = { key2: '1' };
    const transformInput = () => ({ key2: '2' });
    const output1 = parse(
      omit(
        object({ key1: string(), key2: string() }),
        ['key1'],
        [transformInput]
      ),
      input
    );
    const output2 = parse(
      omit(object({ key1: string(), key2: string() }), ['key1'], 'Error', [
        transformInput,
      ]),
      input
    );
    expect(output1).toEqual(transformInput());
    expect(output2).toEqual(transformInput());
  });
});
