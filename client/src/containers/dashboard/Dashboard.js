import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../../components/layout/Spinner';

import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';

const Dashboard = ({
  auth: { user }, loadUser
}) => {
  useEffect(() => {
    loadUser();
  }, []);

  return user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary text-center'>Dashboard</h1>
      <p className='lead text-center'>
        <i className='fas fa-user'/> Welcome {user && user.name}
      </p>
    </Fragment>
  );
};

Dashboard.propTypes = {};

Dashboard.propTypes = {
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { loadUser }
)(Dashboard);
