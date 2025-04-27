import { expect } from '@jest/globals';

jest.setTimeout(30000);

expect.extend({
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
});

declare global {
  namespace jest {
    interface Matchers<R> {
      toContainObject(argument: object): R;
      toBeTypeOrNull(expectedType: any): R;
    }
  }
}
