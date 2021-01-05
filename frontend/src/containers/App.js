import React from "react";
import Routes from "../routes/Routes";
import { Router } from "react-router-dom";
import history from "../routes/History";
import { SnackbarProvider } from "notistack";
import Loader from "../components/Loader/Loader";
import "./App.scss";
import { connect } from "react-redux";
class App extends React.Component {
  // App contains routes and also wrapped with snackbar
  render() {
    const { loading } = this.props;
    return (
        <div>
          {loading ? <Loader /> : null}
          <Router history={history}>
            <SnackbarProvider
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              maxSnack={3}
              autoHideDuration={4000}
            >
              <Routes />
            </SnackbarProvider>
          </Router>
        </div>
    );
  }
}

const mapStateToProps = ({ loading }) => ({
  loading,
});

export default connect(mapStateToProps, {})(App);
