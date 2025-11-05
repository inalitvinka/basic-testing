import { simpleCalculator, Action } from './index';

const TEST_TIMEOUT_MS = 30000;

const testCases = [
  {
    description: 'should add two numbers',
    a: 3,
    b: 4,
    action: Action.Add,
    expected: 7,
  },
  {
    description: 'should subtract two numbers',
    a: 40,
    b: 8,
    action: Action.Subtract,
    expected: 32,
  },
  {
    description: 'should multiply two numbers',
    a: 25,
    b: 4,
    action: Action.Multiply,
    expected: 100,
  },
  {
    description: 'should divide two numbers',
    a: 81,
    b: 9,
    action: Action.Divide,
    expected: 9,
  },
  {
    description: 'should exponentiate two numbers',
    a: 3,
    b: 2,
    action: Action.Exponentiate,
    expected: 9,
  },
  {
    description: 'should return null for invalid action',
    a: 234,
    b: 123,
    action: 'Hello NodeJS',
    expected: null,
  },
  {
    description: 'should return null for invalid arguments',
    a: '11',
    b: 3,
    action: Action.Add,
    expected: null,
  },
];

describe('simpleCalculator', () => {
  beforeAll(() => {
    jest.setTimeout(TEST_TIMEOUT_MS);
  });
  test.each(testCases)('$description', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toEqual(expected);
  });
});
