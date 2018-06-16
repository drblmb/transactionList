import * as R from 'ramda';

export const setProp = path => state => R.compose(R.assocPath(R.__, state, {}), R.split('.'))(path);

export default {};
