import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

const TEST_TIMEOUT_MS = 30000;

describe('resolveValue', () => {
  test(
    'should resolve provided value',
    async () => {
      const valueForTest = 42;
      const value = await resolveValue(valueForTest);
      expect(value).toBe(valueForTest);
    },
    TEST_TIMEOUT_MS,
  );
});

describe('throwError', () => {
  test(
    'should throw error with provided message',
    () => {
      const errorMsg = 'I am an error message!';
      expect(() => throwError(errorMsg)).toThrow(errorMsg);
    },
    TEST_TIMEOUT_MS,
  );

  test(
    'should throw error with default message if message is not provided',
    () => {
      const defaulErrortMsg = 'Oops!';
      expect(() => throwError()).toThrow(defaulErrortMsg);
    },
    TEST_TIMEOUT_MS,
  );
});

describe('throwCustomError', () => {
  test(
    'should throw custom error',
    () => {
      expect(() => throwCustomError()).toThrow(MyAwesomeError);
    },
    TEST_TIMEOUT_MS,
  );
});

describe('rejectCustomError', () => {
  test(
    'should reject custom error',
    async () => {
      await expect(rejectCustomError).rejects.toThrow(MyAwesomeError);
    },
    TEST_TIMEOUT_MS,
  );
});
