import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Logo from "../../assets/images/ScreenitOriginal.png";
import SidebarLogo from "../../assets/images/sidebarlogo.png";
import ForgotPasswordField from "../../components/Controls/InputField/ForgotPasswordField";
import LoginField from "../../components/Controls/InputField/LoginField";
import RegisterField from "../../components/Controls/InputField/RegisterField";
import { axiosInstance } from "../../network/apis";
import { default as History, default as history } from "../../routes/History";
import { dispatchSnackbarError } from "../../utils/Shared";

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.primary.main,
      textDecoration: "none",
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 400,
    minWidth: 300,
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "",
    password: "",
    establishmentId: "",
    showPassword: false,
  });
  const [selected, setSelected] = useState("Log In");
  // this method is only to trigger route guards , remove and use your own logic
  const handleLogin = async () => {
    const requestOptions = {
      establishmentId: values.establishmentId,
      email: values.email,
      password: values.password,
    };
    await axiosInstance
      .post("/auth/signin", requestOptions)
      .then((response) => {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);
      })
      .catch((error) => {
        if (error.response != null) {
          dispatchSnackbarError(error.response.data);
        } else {
          dispatchSnackbarError(
            "Cannot connect to server! Please try again later."
          );
        }
      });
    History.push("/");
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Router history={history}>
      <Grid container style={{ minHeight: "100vh" }}>
        <Grid item xs={12} sm={6}>
          <img
            src={SidebarLogo}
            style={{
              width: "100%",
              height: "100vh",
              objectFit: "cover",
              overflow: "hidden",
            }}
            alt="ScreenIt"
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          alignItems="center"
          direction="column"
          style={{ padding: 10 }}
        >
          <div />
          <div className={classes.content}>
            <Grid container justify="center">
              <img src={Logo} width={400} alt="logo" />
            </Grid>
            <main>
              <Switch>
                <Route path="/login">
                  <LoginField
                    values={values}
                    handleChange={handleChange}
                    handleClickShowPassword={handleClickShowPassword}
                    handleMouseDownPassword={handleMouseDownPassword}
                  />
                </Route>
                <Route path="/register">
                  <RegisterField
                    values={values}
                    handleChange={handleChange}
                    handleClickShowPassword={handleClickShowPassword}
                    handleMouseDownPassword={handleMouseDownPassword}
                    setSelected={setSelected}
                  />
                </Route>
                <Route path="/forgotPassword">
                  <ForgotPasswordField
                    values={values}
                    handleChange={handleChange}
                    handleClickShowPassword={handleClickShowPassword}
                    handleMouseDownPassword={handleMouseDownPassword}
                    setSelected={setSelected}
                  />
                </Route>
              </Switch>
            </main>
            <div />
            <div style={{ height: 20 }} />
            {selected === "Log In" && (
              <div className={classes.content}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => handleLogin()}
                >
                  Log In
                </Button>
                <div style={{ height: 20 }} />
                <Button
                  className={classes.button}
                  component={Link}
                  to="/register"
                  onClick={() => setSelected("Register")}
                >
                  Register
                </Button>
                <Button
                  className={classes.button}
                  component={Link}
                  to="/forgotPassword"
                  onClick={() => setSelected("Forgot Password")}
                >
                  Forgot Password
                </Button>
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </Router>
  );
}
