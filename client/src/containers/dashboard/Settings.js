import React, {
  Fragment,
  useState
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NoticeModal from '../../components/layout/NoticeModal';
import {
  changeUserCredentials,
  changeUserPassword,
  removeAccount
} from '../../actions/auth';
import { setAlert } from '../../actions/alert';

const Settings = ({ user, changeUserCredentials, setAlert, changeUserPassword, removeAccount }) => {
  const [noticeModelOpen, setNoticeModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    password: '',
    passwordConfirmation: ''
  });

  const { name, username, email, password, passwordConfirmation } = formData;

  /**
   * On change event for form inputs
   * @param e
   */
  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /**
   * Prompt with delete message on user delete click
   */
  const promptDeleteMessage = () => {
    setNoticeModalOpen(true);
  };

  /**
   * Submit user credentials update
   * @param e
   */
  const onSubmitUpdateCredentials = (e) => {
    e.preventDefault();
    changeUserCredentials({ username, name });
  };

  /**
   * Handle event on update password
   * @param e
   */
  const onSubmitUpdatePassword = (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setAlert('Passwords do not match', 'danger');
    } else {
      changeUserPassword({ password, username });
    }
  };

  /**
   * Handle event on delete account accepted
   */
  const onDeleteAccount = () => {
    removeAccount(user.username);
    setNoticeModalOpen(false);
  };

  return (
    <Fragment>
      <NoticeModal
        acceptText={'Yes'}
        modalBody={'Are you sure you want to delete your account?'}
        rejectText={'No'}
        onHandleAccept={() => onDeleteAccount()}
        showModal={noticeModelOpen}
        modalTitle={'Delete Account'}
        onHandleReject={() => setNoticeModalOpen(false)}
        onHandleCloseModal={() => setNoticeModalOpen(false)}
      />
      <h1 className='large text-primary text-center'>Settings</h1>
      <p className='lead'>
        <i className='fas fa-user'/> Change User Credentials
      </p>
      <form className='form' onSubmit={e => onSubmitUpdateCredentials(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Username'
            name='username'
            value={username}
            onChange={e => onChange(e)}
            disabled={true}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            disabled={true}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Update Credentials'/>
      </form>
      <br/>
      <p className='lead'>
        <i className='fas fa-key'/> Change Password
      </p>
      <form className='form' onSubmit={e => onSubmitUpdatePassword(e)}>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='passwordConfirmation'
            minLength='6'
            value={passwordConfirmation}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Update Password'/>
      </form>
      <br/>
      <p className='lead'>
        <i className='fas fa-user-slash'/> Remove My Account
      </p>
      <button onClick={() => promptDeleteMessage()} className="btn btn-danger">Remove</button>
    </Fragment>
  );
};

Settings.propTypes = {
  user: PropTypes.object.isRequired,
  changeUserCredentials: PropTypes.func.isRequired,
  changeUserPassword: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  removeAccount: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, {
  changeUserCredentials,
  changeUserPassword,
  setAlert,
  removeAccount
})(Settings);