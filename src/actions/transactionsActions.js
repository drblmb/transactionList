import {
  SET_TRANSACTIONS_FILTER,
} from 'constants/actionTypes';
import minilog from 'minilog';

const logger = minilog('TransactionsActions');

export const setTransactionsFilter = filter => (dispatch) => {
  logger.debug(`Setting filter to "${filter}"`)

  dispatch({
    type: SET_TRANSACTIONS_FILTER,
    filter,
  });
};
