import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/pages/Home'; 
import About from './components/pages/About'; 
import Navbar from '../src/components/layout/Navbar'; 
import ContactState from '../src/context/contact/ContactState'; 
import AuthState from '../src/context/auth/AuthState';
import Register from '../src/components/auth/Register'; 
import Login from '../src/components/auth/Login'; 
import AlertState from '../src/context/alert/AlertState'; 
import Alert from '../src/components/layout/Alert'; 
import Alerts from '../src/components/layout/Alert';
import setAuthToken from './utils/setAuthToken'; 
import PrivateRoute from './components/routing/PrivateRoute';


 const App = () =>  {
  return (
    <AuthState>
    <ContactState>
     <AlertState> 
    <Router>
      <Fragment>
      <Navbar />
      <div className="container">
        <Alerts />
        <Switch>
          <PrivateRoute exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </div>
      </Fragment>
  </Router>
  </AlertState>
  </ContactState>
  </AuthState>
  );
}

export default App;
