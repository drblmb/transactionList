import * as R from 'ramda';
import transactionList, {
  nodePath,
  getTransactions,
  getTransactionsFilter,
  getFilteredTransactions,
  initialState,
} from 'reducers/transactionListReducer';
import {
  LOAD_TRANSACTIONS,
  SET_TRANSACTIONS_FILTER,
  INITIAL_STATE,
} from 'constants/actionTypes';
import { setProp } from 'test/utils';
import { formatDateTimeFromBadFormat } from 'lib/dateUtils';

const setP = setProp(nodePath);

describe('Transaction List Reducer', () => {
  it('should not change a state when action is invalid', () => {
    const oldState = [{ abc: '123' }];

    expect(transactionList(oldState, { type: 'UNKNOWN' })).toEqual(oldState);
  });

  it('should not change initial state if action is not passed', () => {
    expect(transactionList()).toEqual(initialState);
  });

  it('should load transaction list data', () => {
    const transactions = [
      {
        id: '1',
        name: 'Test 1',
      },
      {
        id: '2',
        name: 'Test 2',
      },
    ];

    const action = {
      type: LOAD_TRANSACTIONS,
      transactions,
    };

    expect(getTransactions(setP(transactionList(initialState, action))))
      .toEqual(transactions);
  });

  it('should load filter', () => {
    const action = {
      type: SET_TRANSACTIONS_FILTER,
      filter: 'I am filter text',
    };

    expect(getTransactionsFilter(setP(transactionList(initialState, action))))
      .toEqual('I am filter text');
  });
});

describe('Transaction List Selectors', () => {
  describe('getFilteredTransactions', () => {
    it('Should return transactions containing filter text', () => {
      const state7 = setP({ ...initialState, filter: '7' });
      const state44 = setP({ ...initialState, filter: '44' });
      const expectedTransactionsFilter7 = [
        { amount: '112.98', date: formatDateTimeFromBadFormat('27-01-2018T12:34'), card_last_four: '2544' },
        { amount: '0.45', date: formatDateTimeFromBadFormat('01-12-2017T9:36'), card_last_four: '4434' },
        { amount: '95.99', date: formatDateTimeFromBadFormat('23-11-2017T14:34'), card_last_four: '3011' },
        { amount: '7774.32', date: formatDateTimeFromBadFormat('17-07-2017T03:34'), card_last_four: '6051' },
        { amount: '1345.98', date: formatDateTimeFromBadFormat('22-06-2017T10:33'), card_last_four: '0059' },
        { amount: '2850.70', date: formatDateTimeFromBadFormat('27-01-2018T12:34'), card_last_four: '4444' },
        { amount: '1.00', date: formatDateTimeFromBadFormat('17-02-2018T18:34'), card_last_four: '1669' },
      ];
      const expectedTransactionsFilter44 = [
        { amount: '112.98', date: formatDateTimeFromBadFormat('27-01-2018T12:34'), card_last_four: '2544' },
        { amount: '0.45', date: formatDateTimeFromBadFormat('01-12-2017T9:36'), card_last_four: '4434' },
        { amount: '2850.70', date: formatDateTimeFromBadFormat('27-01-2018T12:34'), card_last_four: '4444' },
      ];

      expect(getFilteredTransactions(state7)).toEqual(expectedTransactionsFilter7);
      expect(getFilteredTransactions(state44)).toEqual(expectedTransactionsFilter44);
    });

    it('Should return full transaction list if filter is empty or null', () => {
      const stateEmptyFilter = setP({ ...initialState, filter: '' });
      const stateNullFilter = setP({ ...initialState, filter: null });
      const expectedResult = [
        { amount: '112.98', date: formatDateTimeFromBadFormat('27-01-2018T12:34'), card_last_four: '2544' },
        { amount: '0.45', date: formatDateTimeFromBadFormat('01-12-2017T9:36'), card_last_four: '4434' },
        { amount: '95.99', date: formatDateTimeFromBadFormat('23-11-2017T14:34'), card_last_four: '3011' },
        { amount: '7774.32', date: formatDateTimeFromBadFormat('17-07-2017T03:34'), card_last_four: '6051' },
        { amount: '1345.98', date: formatDateTimeFromBadFormat('22-06-2017T10:33'), card_last_four: '0059' },
        { amount: '2850.70', date: formatDateTimeFromBadFormat('27-01-2018T12:34'), card_last_four: '4444' },
        { amount: '45.00', date: formatDateTimeFromBadFormat('10-02-2018T02:34'), card_last_four: '0110' },
        { amount: '1.00', date: formatDateTimeFromBadFormat('17-02-2018T18:34'), card_last_four: '1669' },
        { amount: '4.69', date: formatDateTimeFromBadFormat('01-02-2018T02:34'), card_last_four: '8488' },
        { amount: '1111.11', date: formatDateTimeFromBadFormat('15-01-2018T21:34'), card_last_four: '9912' }
      ];

      expect(getFilteredTransactions(stateEmptyFilter)).toEqual(expectedResult);
      expect(getFilteredTransactions(stateNullFilter)).toEqual(expectedResult);
    });
  });
});
