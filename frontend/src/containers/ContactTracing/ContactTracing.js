import React, { useState } from "react";
import { connect } from "react-redux";
// import PaperButton from '../../components/Controls/Button/PaperButton'
import ButtonGroup from "../../components/Controls/Button/ButtonGroup";
import CustomersTable from "../../components/Table/CustomersTable";
import PossibleContactsTable from "../../components/Table/PossibleContactsTable";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import { CSVLink, CSVDownload } from "react-csv";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  paper: {
    padding: theme.spacing(2),
    //display: "flex",
    //overflow: "auto",
    flexDirection: "column",
  },
  button: {
    margin: theme.spacing(2),
  },
  // fixedHeight: {
  //     height: 500,
  // }
}));

export default function ContactTracing(props) {
  const classes = useStyles();
  const [buttons] = useState([
    { quantity: 128, category: "Contact Trace", icon: PeopleAltIcon },
  ]);

  return (
    <Grid container spacing={3} justify="center" alignItems="baseline">
      <Grid item xs={10}>
        <Paper className={classes.paper}>
          <CustomersTable />
        </Paper>
      </Grid>
    </Grid>
  );
}

/*
<Grid item xs={10}>
  <Button
    variant="contained"
    classes={classes.button}
    color="secondary"
    style={{ borderRadius: 5, margin: 5 }}
  >
    <span style={{color: "white"}} >Notify</span>
  </Button>

  <Button
    variant="contained"
    classes={classes.button}
    color="secondary"
    style={{ borderRadius: 5, margin: 5  }}
  >
    <span style={{color: "white"}} >Export</span>
  </Button>
</Grid>

*/

/*

  <Grid item xs={10}>
    <Paper className={classes.paper}>
      <SearchIcon />
      <InputBase
              className={classes.input}
              placeholder="Search"
              inputProps={{ 'aria-label': 'Search' }}
            />
    </Paper>
  </Grid>
*/

//<IconButton type="submit" className={classes.iconButton} aria-label="search">
//</IconButton>

/*
<Grid item xs={12}>
    <ButtonGroup buttons={buttons} page="Queue"/>
</Grid>
    */

// const mapStateToProps = (state) => {
//     return {
//         lang : state.lang
//     }
// }

// export default connect(mapStateToProps,null)(Home);
