import React, { useState } from "react";
import {
  Grid,
  TextField,
  InputAdornment,
  Button,
  IconButton,
} from "@material-ui/core";
import Logo from "../../assets/images/ScreenitOriginal.png";
import SidebarLogo from "../../assets/images/sidebarlogo.png";
import History from "../../routes/History";
import { axiosInstance } from "../../network/apis";
import {
  AccountCircle,
  LockRounded,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
export default function Login(props) {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  // this method is only to trigger route guards , remove and use your own logic
  const handleLogin = async () => {
    const loginResponse = await axiosInstance.post("/auth/signin", {
      email: values.email,
      password: values.password,
    });
    const { token, user } = loginResponse.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);
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
    <div>
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 400,
              minWidth: 300,
            }}
          >
            <Grid container justify="center">
              <img src={Logo} width={400} alt="logo" />
            </Grid>
            <TextField
              label="Email"
              margin="normal"
              value={values.email}
              onChange={handleChange("email")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              type={values.showPassword ? "text" : "password"}
              label="Password"
              margin="normal"
              value={values.password}
              onChange={handleChange("password")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRounded />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div style={{ height: 20 }} />
            <Button
              color="primary"
              variant="contained"
              onClick={() => handleLogin()}
            >
              Log In
            </Button>
            <div style={{ height: 20 }} />
            <Button>Register</Button>
          </div>
          <Grid container justify="center">
            <Grid item>
              <Button>Forgot Password</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
