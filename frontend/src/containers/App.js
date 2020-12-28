import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Router } from "react-router-dom";
import history from "../routes/History";
import { SnackbarProvider } from "notistack";
import Loader from "../components/Loader/Loader";
import "./App.scss";
import { connect } from "react-redux";
import { setCurrentLang } from "../store/Lang/LangAction";
class App extends React.Component {
  // App contains routes and also wrapped with snackbar and intl for localization

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
            {/* <MaterialSnackbar /> */}
              <Navbar />
            {/* {<Routes lang={lang} />} */}
            </SnackbarProvider>
          </Router>
        </div>
      // </IntlProvider>
    );
  }
}

const mapStateToProps = ({ lang, loading }) => ({
  lang,
  loading,
});

export default connect(mapStateToProps, { setCurrentLang })(App);
