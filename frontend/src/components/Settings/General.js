import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Save } from "@material-ui/icons";
import { TextField, Button } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  title: {
    color: theme.palette.primary.main,
    fontWeight: 900,
  },
  container: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  button: {
    margin: theme.spacing(1),
  },
  buttonContainer: {
    textAlign: "right",
  },
}));

export default function General(props) {
  const classes = useStyles();
  const category = useSelector((state) => state.setting.category);

  return (
    <Grid item xs={10}>
      <Paper className={classes.paper}>
        <Grid container spacing={3} className={classes.container}>
          <Grid item xs={12}>
            <h4 className={classes.title}>{category} Settings</h4>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-message"
              label="Establishment Name"
              type="text"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-capacity"
              label="Establishment ID"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={123112}
              variant="outlined"
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-capacity"
              label="Max Capacity"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-message"
              label="Notification Message"
              type="text"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12} className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<Save />}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
