/**
 * Jest Global Setup File
 * Define custom matchers for improved testing expressiveness.
 */

import { expect } from '@jest/globals';

jest.setTimeout(30000); // Extiende el timeout global de las pruebas

expect.extend({
  /**
   * Verifica si un array contiene al menos un objeto con las propiedades esperadas.
   * @param {any[]} received - Array recibido.
   * @param {Record<string, unknown>} argument - Objeto esperado dentro del array.
   * @example
   * expect([{ a: 1 }, { b: 2 }]).toContainObject({ b: 2 });
   */
  toContainObject(received: any[], argument: Record<string, unknown>) {
    const pass = this.equals(received, expect.arrayContaining([expect.objectContaining(argument)]));
    return {
      message: () =>
        pass
          ? `expected ${this.utils.printReceived(received)} not to contain object ${this.utils.printExpected(argument)}`
          : `expected ${this.utils.printReceived(received)} to contain object ${this.utils.printExpected(argument)}`,
      pass,
    };
  },

  /**
   * Verifica si un valor es de un tipo específico o null.
   * @param {any} received - Valor recibido.
   * @param {Function} expectedType - Clase esperada.
   * @example
   * expect(null).toBeTypeOrNull(Date);
   * expect(new Date()).toBeTypeOrNull(Date);
   */
  toBeTypeOrNull(received: any, expectedType: any) {
    const isExpectedType = received instanceof expectedType;
    const isNull = received === null;

    return {
      message: () =>
        isExpectedType || isNull
          ? `expected ${received} not to be instance of ${expectedType.name} or null`
          : `expected ${received} to be instance of ${expectedType.name} or null`,
      pass: isExpectedType || isNull,
    };
  },

  /**
   * Verifica si un array, string u objeto está vacío.
   * @param {any} received - Valor recibido.
   * @example
   * expect([]).toBeEmpty();
   * expect('').toBeEmpty();
   * expect({}).toBeEmpty();
   */
  toBeEmpty(received: any) {
    const pass =
      received != null &&
      ((Array.isArray(received) && received.length === 0) ||
        (typeof received === 'object' && !Array.isArray(received) && Object.keys(received).length === 0) ||
        (typeof received === 'string' && received.length === 0));

    return {
      message: () =>
        pass
          ? `expected ${this.utils.printReceived(received)} not to be empty`
          : `expected ${this.utils.printReceived(received)} to be empty`,
      pass,
    };
  },

  /**
   * Verifica si un objeto coincide con un esquema simple (propiedades y tipos).
   * @param {object} received - Objeto recibido.
   * @param {Record<string, string>} schema - Esquema: { key: "string" | "number" | "boolean" }
   * @example
   * expect({ id: 1, name: 'a' }).toMatchSchema({ id: 'number', name: 'string' });
   */
  toMatchSchema(received: object, schema: Record<string, string>) {
    const pass = Object.entries(schema).every(([key, type]) => typeof (received as any)[key] === type);
    return {
      message: () =>
        pass
          ? `expected object not to match schema`
          : `expected object to match schema\nExpected: ${JSON.stringify(schema)}\nReceived: ${JSON.stringify(received)}`,
      pass,
    };
  },

  /**
   * Verifica si un número está entre dos valores (inclusive).
   * @param {number} received - Número recibido.
   * @param {number} floor - Límite inferior.
   * @param {number} ceiling - Límite superior.
   * @example
   * expect(5).toBeBetween(1, 10);
   */
  toBeBetween(received: number, floor: number, ceiling: number) {
    const pass = received >= floor && received <= ceiling;

    return {
      message: () =>
        pass
          ? `expected ${received} not to be between ${floor} and ${ceiling}`
          : `expected ${received} to be between ${floor} and ${ceiling}`,
      pass,
    };
  },
});

/**
 * Tipado global para los nuevos matchers
 */
declare global {
  namespace jest {
    interface Matchers<R> {
      toContainObject(argument: Record<string, unknown>): R;
      toBeTypeOrNull(expectedType: any): R;
      toBeEmpty(): R;
      toMatchSchema(schema: Record<string, string>): R;
      toBeBetween(floor: number, ceiling: number): R;
    }
  }
}
