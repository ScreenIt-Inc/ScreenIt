import React from "react";
import { Router } from "react-router-dom";
import MaterialSnackbar from "../components/Snackbar/Snackbar";
import history from "../routes/History";
import Routes from "../routes/Routes";
import "./App.scss";
export default function App() {
  // App contains routes and also wrapped with snackbar
  return (
    <div>
      <Router history={history}>
        <MaterialSnackbar />
        <Routes />
      </Router>
    </div>
  );
}
