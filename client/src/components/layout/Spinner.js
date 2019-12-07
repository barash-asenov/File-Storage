import React, { Fragment } from 'react';
import spinner from '../../img/giphy.gif';

const Spinner = props => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
  </Fragment>
);

export default Spinner;
