import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import Logo from "../../assets/images/ScreenitOriginal.png";
import SidebarLogo from "../../assets/images/sidebarlogo.png";
import LoginField from "../../components/Controls/InputField/LoginField";
import RegisterField from "../../components/Controls/InputField/RegisterField";
import ForgotPasswordField from "../../components/Controls/InputField/ForgotPasswordField";
import History from "../../routes/History";
import { axiosInstance } from "../../network/apis";
import { dispatchSnackbarError } from "../../utils/Shared";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import history from "../../routes/History";

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
    showPassword: false,
  });
  const [selected, setSelected] = useState("Log In");
  // this method is only to trigger route guards , remove and use your own logic
  const handleLogin = async () => {
    const requestOptions = {
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
        // console.log(error.response.data.errors.message);
        dispatchSnackbarError(error.response.data);
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
