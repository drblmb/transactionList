import * as R from 'ramda';
import { connect } from 'react-redux';
import {
  getFilteredTransactions,
  getTransactionsFilter,
} from 'reducers/transactionListReducer';
import { setTransactionsFilter } from 'actions/transactionsActions';
import { formatDateTime } from 'lib/dateUtils';
import TransactionsList from './TransactionsList';

const sortByDate = R.pipe(
  R.map(transaction => R.assoc('date', new Date(transaction.date), transaction)),
  R.sortBy(R.prop('date')),
  R.map(transaction => R.assoc('date', formatDateTime(transaction.date), transaction)),
);
const mapStateToProps = state => {
  return {
      transactions: sortByDate(getFilteredTransactions(state)),
      filter: getTransactionsFilter(state),
  }
};

export default connect(mapStateToProps, { setTransactionsFilter })(TransactionsList);
