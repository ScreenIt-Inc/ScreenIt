import React, { Suspense } from "react";
import {
  Router,
  Switch,
  Redirect
} from "react-router-dom";
import history from "./History";
import * as LazyComponent from "../utils/LazyLoaded";
import Loader from "../components/Loader/Loader";
import PrivateRoute from "../utils/PrivateRoute";



const Routes = () => {

  return (
    <Suspense fallback={<Loader />}>
      <Router history={history}>
        <Switch>
          <LazyComponent.Login path="/login" exact />
          <LazyComponent.CustomerForm path="/customerform/:uuid" exact />
          <PrivateRoute component={LazyComponent.Home} path="/queue" exact />
          <Redirect from="**" to={"/queue"} exact />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default Routes;
