import {
  formatDate,
  formatDateTime,
  formatDateTimeFromBadFormat,
  getDateRange,
} from './dateUtils';

jest.mock('moment', () => {
  const moment = require.requireActual('moment');
  return moment.utc;
});

describe('Date Utils', () => {
  describe('formatDate', () => {
    it('should format the date according to the US standard', () => {
      expect(formatDate('2018-03-27T07:52:50.696Z')).toEqual('03/27/2018');
    });

    it('should return an empty string if date is not defined', () => {
      expect(formatDate()).toEqual('');
    });
  });

  describe('formatDateTime', () => {
    it('should format the date and time according to the US standard', () => {
      expect(formatDateTime('2018-03-27T07:52:50.696Z')).toEqual('03/27/2018 7:52 AM');
    });

    it('should return an empty string if date is not defined', () => {
      expect(formatDateTime()).toEqual('');
    });
  });

  describe('formatDateTimeFromBadFormat', () => {
    it('should format the date and time according to the US standard', () => {
      expect(formatDateTimeFromBadFormat('27-03-2018T7:52')).toEqual('03/27/2018 7:52 AM');
    });

    it('should return an empty string if date is not defined', () => {
      expect(formatDateTimeFromBadFormat()).toEqual('');
    });
  });
  describe('getDateRange', () => {
    it('should return a list of dates between start and end dates', () => {
      expect(getDateRange(new Date(2018, 0, 10), new Date(2018, 0, 12))).toEqual([
        '2018-01-10',
        '2018-01-11',
        '2018-01-12',
      ]);
    });
  });
});
