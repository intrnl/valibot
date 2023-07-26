import { describe, expect, test } from 'vitest';
import { parseAsync } from '../../methods/index.js';
import { nullType } from '../nullType/index.js';
import { number } from '../number/index.js';
import { any } from '../any/index.js';
import { undefinedType } from '../undefinedType/index.js';
import { nullish } from '../nullish/index.js';
import { unionAsync } from '../union/index.js';
import { stringAsync } from '../string/index.js';
import { nonNullishAsync } from './nonNullishAsync.js';

describe('nonNullishAsync', () => {
  test('should not pass null or undefined', async () => {
    const schema1 = nonNullishAsync(
      unionAsync([stringAsync(), nullType(), undefinedType()])
    );
    const input1 = 'test';
    const output1 = await parseAsync(schema1, input1);
    expect(output1).toBe(input1);
    await expect(parseAsync(schema1, null)).rejects.toThrowError();
    await expect(parseAsync(schema1, undefined)).rejects.toThrowError();
    await expect(parseAsync(schema1, 123)).rejects.toThrowError();
    await expect(parseAsync(schema1, {})).rejects.toThrowError();

    const schema2 = nonNullishAsync(nullish(number()));
    const input2 = 123;
    const output2 = await parseAsync(schema2, input2);
    expect(output2).toBe(input2);
    await expect(parseAsync(schema2, null)).rejects.toThrowError();
    await expect(parseAsync(schema2, undefined)).rejects.toThrowError();
    await expect(parseAsync(schema2, 'test')).rejects.toThrowError();
    await expect(parseAsync(schema2, {})).rejects.toThrowError();
  });

  test('should throw custom error', async () => {
    const error = 'Value is not non nullish!';
    await expect(
      parseAsync(nonNullishAsync(any(), error), null)
    ).rejects.toThrowError(error);
  });
});
