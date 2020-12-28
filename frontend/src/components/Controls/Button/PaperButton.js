import React from "react";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
        },
    },
}));

export default PaperButton = ({text , handleClick}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Paper variant="contained" color="primary" onClick={handleClick} elevation={3}>
            {text}
        </Paper>
    </div>
  );
};
