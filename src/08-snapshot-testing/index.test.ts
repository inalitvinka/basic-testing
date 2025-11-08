import { generateLinkedList } from './index';

const items = ['do', 're', 'mi', 'fa'];
const expectedList = {
  value: items[0],
  next: {
    value: items[1],
    next: {
      value: items[2],
      next: {
        value: items[3],
        next: {
          value: null,
          next: null,
        },
      },
    },
  },
};

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const result = generateLinkedList(items);
    expect(result).toStrictEqual(expectedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const result = generateLinkedList(items);
    expect(result).toMatchSnapshot();
  });
});
