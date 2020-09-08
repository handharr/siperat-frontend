import React from 'react'; // import React
import { BrowserRouter, Route, Switch } from 'react-router-dom'; // import react-router-dom
import { Login, MainDashboard } from '../../containers'; // import containers

/**
 * routing components with react-router-dom
 */
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

