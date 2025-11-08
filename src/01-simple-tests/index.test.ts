import { simpleCalculator, Action } from './index';

const TEST_TIMEOUT_MS = 30000;

describe('simpleCalculator tests', () => {
  test(
    'should add two numbers',
    () => {
      expect(
        simpleCalculator({
          a: 3,
          b: 4,
          action: Action.Add,
        }),
      ).toBe(7);
    },
    TEST_TIMEOUT_MS,
  );

  test(
    'should subtract two numbers',
    () => {
      expect(
        simpleCalculator({
          a: 40,
          b: 8,
          action: Action.Subtract,
        }),
      ).toBe(32);
    },
    TEST_TIMEOUT_MS,
  );

  test(
    'should multiply two numbers',
    () => {
      expect(
        simpleCalculator({
          a: 25,
          b: 4,
          action: Action.Multiply,
        }),
      ).toBe(100);
    },
    TEST_TIMEOUT_MS,
  );

  test(
    'should divide two numbers',
    () => {
      expect(
        simpleCalculator({
          a: 81,
          b: 9,
          action: Action.Divide,
        }),
      ).toBe(9);
    },
    TEST_TIMEOUT_MS,
  );

  test(
    'should exponentiate two numbers',
    () => {
      expect(
        simpleCalculator({
          a: 3,
          b: 2,
          action: Action.Exponentiate,
        }),
      ).toBe(9);
    },
    TEST_TIMEOUT_MS,
  );

  test(
    'should return null for invalid action',
    () => {
      expect(
        simpleCalculator({
          a: 234,
          b: 123,
          action: 'Hello NodeJS',
        }),
      ).toBeNull();
    },
    TEST_TIMEOUT_MS,
  );

  test(
    'should return null for invalid arguments',
    () => {
      expect(
        simpleCalculator({
          a: '11',
          b: 3,
          action: Action.Add,
        }),
      ).toBeNull();
    },
    TEST_TIMEOUT_MS,
  );
});
