import * as R from 'ramda';
import {
  LOAD_TRANSACTIONS,
  SET_TRANSACTIONS_FILTER,
  INITIAL_STATE,
} from 'constants/actionTypes';
import { getProp } from 'lib/selectorUtils';
import { formatDateTimeFromBadFormat } from 'lib/dateUtils';

export const nodePath = 'transactionList';
const p = getProp(nodePath);

export const initialState = {
  transactions: [
    { amount: 112.98, date: '27-01-2018T12:34', card_last_four: '2544' },
    { amount: 0.45, date: '01-12-2017T9:36', card_last_four: '4434' },
    { amount: 95.99, date: '23-11-2017T14:34', card_last_four: '3011' },
    { amount: 7774.32, date: '17-07-2017T03:34', card_last_four: '6051' },
    { amount: 1345.98, date: '22-06-2017T10:33', card_last_four: '0059' },
    { amount: 2850.70, date: '27-01-2018T12:34', card_last_four: '4444' },
    { amount: 45.00, date: '10-02-2018T02:34', card_last_four: '0110' },
    { amount: 1.00, date: '17-02-2018T18:34', card_last_four: '1669' },
    { amount: 4.69, date: '01-02-2018T02:34', card_last_four: '8488' },
    { amount: 1111.11, date: '15-01-2018T21:34', card_last_four: '9912' }
  ],
  filter: '',
};

export default function transactionList(state = initialState, action = {}) {
  switch (action.type) {
    case INITIAL_STATE:
      return R.clone(initialState);
    case LOAD_TRANSACTIONS:
      return R.assoc('transactions', action.transactions, state);
    case SET_TRANSACTIONS_FILTER:
      return R.assoc('filter', action.filter, state);
    default:
      return state;
  }
}

export const getTransactions = p('transactions');

export const getTransactionsFilter = p('filter');

// Improvements: Ignore white-space? Move formatting to UI.
// Ensure that the server validates and sends us correct dates and amounts formmated
const stringContainsNoCase = R.curry((source, string) =>
  R.test(new RegExp(string, 'gi'), source));

const testTransaction = R.curry((filter, transaction) => R.pipe(
  R.props(['amount', 'date', 'card_last_four']),
  ([amount, dt, cardLastFour]) => R.pipe(
    R.concat(R.__, dt),
    R.concat(R.__, cardLastFour),
    stringContainsNoCase(R.__, filter),
  )(amount),
)(transaction));

const filterTransactions = R.curry((state, filter) => R.pipe(
  getTransactions,
  // Source data has bad dates. Fix them
  R.map(transaction =>
    R.assoc('date', formatDateTimeFromBadFormat(transaction.date), transaction)),
  // Format currency
  R.map(transaction =>
    R.assoc('amount', transaction.amount.toFixed(2), transaction)),
  R.defaultTo([]),
  R.filter(testTransaction(filter)),
)(state));

export const getFilteredTransactions = state => R.pipe(
  getTransactionsFilter,
  R.ifElse(
    R.either(R.isNil, R.isEmpty),
    () => filterTransactions(state)(''),
    filterTransactions(state),
  ),
)(state);
