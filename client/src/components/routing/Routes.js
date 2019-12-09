import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import Register from '../../containers/auth/Register';
import Login from '../../containers/auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../../containers/dashboard/Dashboard';
import MyFiles from '../../containers/dashboard/MyFiles';
import Settings from '../../containers/dashboard/Settings';
import NotFound from '../../containers/misc/NotFound';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => {
  return (
    <section className='container'>
      <Alert/>
      <Switch>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/login' component={Login}/>
        <PrivateRoute exact path='/me/dashboard' component={Dashboard}/>
        <PrivateRoute exact path='/me/gallery' component={MyFiles}/>
        <PrivateRoute exact path='/me/settings' component={Settings}/>
        <Route component={NotFound}/>
      </Switch>
    </section>
  );
};

export default Routes;