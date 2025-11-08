import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const data = {
  greet: 'Hello World!',
};
const fakePath = '/fake/path';
jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: (fn: unknown) => fn,
}));

describe('throttledGetDataFromApi', () => {
  let mockAxiosClient: { get: jest.Mock };
  beforeEach(() => {
    mockAxiosClient = {
      get: jest.fn().mockResolvedValue({ data }),
    };
    (axios.create as jest.Mock).mockReturnValue(mockAxiosClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(fakePath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: BASE_URL,
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(fakePath);
    expect(mockAxiosClient.get).toHaveBeenCalledWith(fakePath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(fakePath);
    expect(result).toEqual(data);
  });
});
