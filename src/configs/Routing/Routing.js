import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login, MainDashboard } from '../../containers';

const Routing = () => {
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/dashboard">
            <MainDashboard />
          </Route>
        </Switch>
    </BrowserRouter>
  )
}

export default Routing;

