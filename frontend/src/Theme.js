import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import rtl from "jss-rtl";
import { create } from "jss";
import { StylesProvider, jssPreset } from "@material-ui/styles";
import App from "./containers/App";

function ThemeApp() {
  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

  const theme = createMuiTheme({
    palette: {
      primary: {
        light: "#55AFB4",
        main: "#344A59",
        dark: "#212936",
        grey: "#9E9E9E",
        white: "#FFFFFF",
      },
      secondary: {
        light: "#56657F",
        main: "#17D8E2",
      },
    },
    overrides: {
      MuiListItem: {
        root: {
          "&$selected": {
            backgroundColor: "#344A59",
            color: "#55AFB4",
            borderRadius: 10,
            marginLeft: 10,
            "&:hover": {
              backgroundColor: "#344A59",
              color: "#55AFB4",
            },
          },
          "&:hover": {
            color: "#55AFB4",
          },
        },
      },
    },
  });
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StylesProvider>
  );
}

export default ThemeApp;
