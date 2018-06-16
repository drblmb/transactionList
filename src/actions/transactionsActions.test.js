import {
  setTransactionsFilter,
} from 'actions/transactionsActions';
import { SET_TRANSACTIONS_FILTER } from 'constants/actionTypes';

describe('Transactions Actions', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
  });

  describe('setTransactionsFilter()', () => {
    it('should dispatch action to set filter', () => {
      setTransactionsFilter('555')(dispatch);
      expect(dispatch).toBeCalledWith({
        type: SET_TRANSACTIONS_FILTER,
        filter: '555',
      });
    });
  });
});
