import path from 'path';
import fs from 'fs';
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';

const TIME = 1000;
const FILE_PATH = 'file.txt';
const FULL_PATH = '/full/path/file.txt';
const FILE_CONTENT = 'I am the best file content';
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
    const counter = 3;
    doStuffByInterval(fakeCallback, TIME);
    expect(fakeCallback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(TIME * counter);
    expect(fakeCallback).toHaveBeenCalledTimes(counter);
  });
});

describe('readFileAsynchronously', () => {
  let spyJoin: jest.SpyInstance;
  let spyExistsSync: jest.SpyInstance;
  let spyReadFile: jest.SpyInstance;

  beforeEach(() => {
    spyJoin = jest.spyOn(path, 'join');
    spyExistsSync = jest.spyOn(fs, 'existsSync');
    spyReadFile = jest.spyOn(fs.promises, 'readFile');
  });

  afterEach(() => jest.restoreAllMocks());

  test('should call join with pathToFile', async () => {
    spyJoin.mockReturnValue(FULL_PATH);
    spyExistsSync.mockReturnValue(false);
    await readFileAsynchronously(FILE_PATH);
    expect(spyJoin).toHaveBeenCalled();
    expect(spyJoin).toHaveBeenCalledTimes(1);
    expect(spyJoin).toHaveBeenCalledWith(__dirname, FILE_PATH);
  });

  test('should return null if file does not exist', async () => {
    spyJoin.mockReturnValue(FULL_PATH);
    spyExistsSync.mockReturnValue(false);
    const result = await readFileAsynchronously(FILE_PATH);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    spyJoin.mockReturnValue(FULL_PATH);
    spyExistsSync.mockReturnValue(true);
    spyReadFile.mockResolvedValue(Buffer.from(FILE_CONTENT));
    const result = await readFileAsynchronously(FILE_PATH);
    expect(result).toBe(FILE_CONTENT);
  });
});
