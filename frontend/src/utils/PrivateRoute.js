import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./Auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log("Authentication", Auth.isAuth());
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        Auth.isAuth() ? <Component {...props} /> : <Redirect to={`/login`} />
      }
    />
  );
};

export default PrivateRoute;
