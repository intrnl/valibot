import { object, type ObjectOutput, type ObjectSchema } from '../../schemas/index.js';
import type { Pipe } from '../../types.js';
import { getErrorAndPipe } from '../../utils/index.js';
import type { ObjectKeys } from './types.js';

/**
 * Creates an object schema that contains not the selected keys of an existing
 * schema.
 *
 * @param schema The schema to omit from.
 * @param keys The selected keys
 * @param pipe A validation and transformation pipe.
 *
 * @returns An object schema.
 */
export function omit<
  TObjectSchema extends ObjectSchema<any>,
  TKeys extends ObjectKeys<TObjectSchema>
>(
  schema: TObjectSchema,
  keys: TKeys,
  pipe?: Pipe<ObjectOutput<Omit<TObjectSchema['object'], TKeys[number]>>>
): ObjectSchema<Omit<TObjectSchema['object'], TKeys[number]>>;

/**
 * Creates an object schema that contains not the selected keys of an existing
 * schema.
 *
 * @param schema The schema to omit from.
 * @param keys The selected keys
 * @param error The error message.
 * @param pipe A validation and transformation pipe.
 *
 * @returns An object schema.
 */
export function omit<
  TObjectSchema extends ObjectSchema<any>,
  TKeys extends ObjectKeys<TObjectSchema>
>(
  schema: TObjectSchema,
  keys: TKeys,
  error?: string,
  pipe?: Pipe<ObjectOutput<Omit<TObjectSchema['object'], TKeys[number]>>>
): ObjectSchema<Omit<TObjectSchema['object'], TKeys[number]>>;

export function omit<
  TObjectSchema extends ObjectSchema<any>,
  TKeys extends ObjectKeys<TObjectSchema>
>(
  schema: TObjectSchema,
  keys: TKeys,
  arg3?:
    | Pipe<ObjectOutput<Omit<TObjectSchema['object'], TKeys[number]>>>
    | string,
  arg4?: Pipe<ObjectOutput<Omit<TObjectSchema['object'], TKeys[number]>>>
): ObjectSchema<Omit<TObjectSchema['object'], TKeys[number]>> {
  // Get error and pipe argument
  const { error, pipe } = getErrorAndPipe(arg3, arg4);

  // Create and return object schema
  return object(
    Object.entries(schema.object).reduce(
      (object, [key, schema]) =>
        keys.includes(key) ? object : { ...object, [key]: schema },
      {}
    ) as Omit<TObjectSchema['object'], TKeys[number]>,
    error,
    pipe
  );
}
