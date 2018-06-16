import * as R from 'ramda';
import moment from 'moment';

export const formatDate = value => (value ? moment(value).format('L') : '');

export const formatDateTime = value => (value ? moment(value).format('L LT') : '');

/* Date provided by payclip is not valid, so fix it up here */
const fixBadFormat = badDate => R.pipe(
  R.split('T'),
  ([dt, tm]) => R.pipe(
    R.split('-'),
    ([day, mon, year]) => `${year}-${mon}-${day}T`,
    validDay => R.pipe(
      R.split(':'),
      ([hr, min]) => `${('0'+hr).slice(-2)}:${('0'+min).slice(-2)}`,
      R.concat(validDay),
    )(tm),
  )(dt),
)(badDate);

export const formatDateTimeFromBadFormat = badDate => R.pipe(
  R.ifElse(
    R.isNil,
    R.always(''),
    R.pipe(
      fixBadFormat,
      formatDateTime,
    ),
  ),
)(badDate);

export const getDateRange = (start, end) => {
  const result = [];
  const mStart = moment(start);
  const mEnd = moment(end);

  while (mEnd.diff(mStart, 'days') >= 0) {
    result.push(mStart.format('YYYY-MM-DD'));
    mStart.add(1, 'days');
  }

  return result;
};
