import React from "react";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(16),
          height: theme.spacing(16),
        },
    },
    paper: {
      backgroundColor: theme.palette.primary.white,
      color: theme.palette.primary.grey,
      "&:hover": {
        color: theme.palette.primary.white,
        backgroundColor: theme.palette.primary.light,
      },
    },
    selected: {
      color: theme.palette.primary.white,
      backgroundColor: theme.palette.primary.light,
      "&:hover": {
        color: theme.palette.primary.white,
        backgroundColor: theme.palette.primary.light,
      },
    },
    icon: {
      width: 50,
      height: 50,
      marginTop: 10
    },
    quantity: {
      fontSize: 24
    },
    category: {
      fontSize: 12,
      paddingBottom: 10,
      marginTop: -16
    }
}));

const PaperButton = ({quantity, category, icon, selected, handleClick}) => {
  const classes = useStyles();
  const Icon = icon;
  return (
    // <div className={classes.root}>
      <Paper className={selected ? classes.selected : classes.paper} variant="contained" color="primary" onClick={handleClick} elevation={5}>
        <Icon className={classes.icon} />
        <p className={classes.quantity}>{quantity}</p>
        <p className={classes.category}>{category}</p>
      </Paper>
    // </div>
  );
};

export default PaperButton
