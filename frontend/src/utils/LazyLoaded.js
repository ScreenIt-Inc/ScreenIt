import React from "react";

export const Home = React.lazy(() => import("../components/Navbar/Navbar"));
export const Login = React.lazy(() => import("../containers/Login/Login"));
export const NotFound = React.lazy(() =>
  import("../components/NotFound/NotFound")
);
export const CustomerForm = React.lazy(() =>
  import("../containers/CustomerForm/CustomerForm")
);
