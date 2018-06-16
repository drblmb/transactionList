import _ from 'lodash';
import SVError from './SVError';

describe('SVError', () => {
  const sverror = new SVError('test message');
  it('should be instance of Error and SVError', () => {
    expect(sverror).toBeInstanceOf(SVError);
    expect(sverror).toBeInstanceOf(Error);
  });
  it('name should be error class name', () => {
    expect(sverror.name).toBe('SVError');
  });
  it('should be recognized as error by other tools', () => {
    expect(_.isError(sverror)).toBe(true);
  });
  it('should have the set message', () => {
    expect(sverror.message).toEqual('test message');
  });
});
