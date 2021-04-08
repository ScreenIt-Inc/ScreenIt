import React, { Suspense } from "react";
import { Redirect, Router, Switch } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import * as LazyComponent from "../utils/LazyLoaded";
import PrivateRoute from "../utils/PrivateRoute";
import history from "./History";

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
