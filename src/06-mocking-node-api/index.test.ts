import { doStuffByTimeout, doStuffByInterval } from '.';

const TIME = 1000;
const fakeCallback = jest.fn();

describe('doStuffByTimeout', () => {
  let spySetTimeout: jest.SpyInstance;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    spySetTimeout = jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(fakeCallback, TIME);
    expect(spySetTimeout).toHaveBeenCalled();
    expect(spySetTimeout).toHaveBeenCalledWith(fakeCallback, TIME);
    expect(spySetTimeout).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(fakeCallback, TIME);
    expect(fakeCallback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(TIME);
    expect(fakeCallback).toHaveBeenCalled();
    expect(fakeCallback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  let spySetInterval: jest.SpyInstance;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    spySetInterval = jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(fakeCallback, TIME);
    expect(spySetInterval).toHaveBeenCalled();
    expect(spySetInterval).toHaveBeenCalledWith(fakeCallback, TIME);
    expect(spySetInterval).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(fakeCallback, TIME);
    expect(fakeCallback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(TIME);
    expect(fakeCallback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(TIME);
    expect(fakeCallback).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(TIME);
    expect(fakeCallback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});
