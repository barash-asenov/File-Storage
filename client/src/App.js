import React, {
  Fragment,
} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './containers/misc/Landing';
import Routes from './components/routing/Routes';

// Redux
import { Provider } from 'react-redux';
import {
  store,
  persistor
} from './store';
import { PersistGate } from 'redux-persist/integration/react';

import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Fragment>
            <Navbar/>
            <Switch>
              <Route exact path='/' component={Landing}/>
              <Route component={Routes}/>
            </Switch>
          </Fragment>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
