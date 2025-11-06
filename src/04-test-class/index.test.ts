import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
} from '.';

const TEST_TIMEOUT_MS = 30000;
const initialBalance = 50;

describe('BankAccount', () => {
  let sourceAccount: BankAccount;
  let targetAccount: BankAccount;

  beforeEach(() => {
    sourceAccount = getBankAccount(initialBalance);
    targetAccount = getBankAccount(initialBalance);
  });

  test(
    'should create account with initial balance',
    () => {
      expect(sourceAccount.getBalance()).toBe(initialBalance);
    },
    TEST_TIMEOUT_MS,
  );

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const unreachableCash = 100;
    const errorMsg = `Insufficient funds: cannot withdraw more than ${initialBalance}`;
    try {
      sourceAccount.withdraw(unreachableCash);
    } catch (error: unknown) {
      if (error instanceof InsufficientFundsError) {
        expect(error.message).toBe(errorMsg);
      } else {
        throw error;
      }
    }

    expect(sourceAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw error when transferring more than balance', () => {
    const amount = 100;
    expect(() => sourceAccount.transfer(amount, targetAccount)).toThrow(
      InsufficientFundsError,
    );
    expect(sourceAccount.getBalance()).toBe(initialBalance);
    expect(targetAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw error when transferring to the same account', () => {
    const amount = 100;
    expect(() => sourceAccount.transfer(amount, sourceAccount)).toThrow(
      TransferFailedError,
    );
    expect(sourceAccount.getBalance()).toBe(initialBalance);
  });

  test('should deposit money', () => {
    const depositAmount = 70;
    sourceAccount.deposit(depositAmount);
    expect(sourceAccount.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const amount = 30;
    sourceAccount.withdraw(amount);
    expect(sourceAccount.getBalance()).toBe(initialBalance - amount);
  });

  test('should transfer money', () => {
    const amount = 30;
    sourceAccount.transfer(amount, targetAccount);
    expect(sourceAccount.getBalance()).toBe(initialBalance - amount);
    expect(targetAccount.getBalance()).toBe(initialBalance + amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
  });
});
