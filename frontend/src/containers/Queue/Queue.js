import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import {
  Announcement,
  AssignmentTurnedIn,
  Notifications,
  PeopleAlt,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import PaperButton from '../../components/Controls/Button/PaperButton'
import ButtonGroup from "../../components/Controls/Button/ButtonGroup";
import Table from "../../components/Table/Table";

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
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  // fixedHeight: {
  //     height: 500,
  // }
}));

export default function Queue(props) {
  const classes = useStyles();
  const table = useSelector((state) => state.table);
  console.log(table);
  const [buttons, setButtons] = useState([
    {
      quantity: table.capacity.length,
      category: "Capacity",
      icon: PeopleAlt,
    },
    {
      quantity: table.queue.length,
      category: "Queue",
      icon: AssignmentTurnedIn,
    },
    {
      quantity: table.notification.length,
      category: "Notifications",
      icon: Notifications,
    },
    {
      quantity: table.alert.length,
      category: "Alert",
      icon: Announcement,
    },
  ]);

  useEffect(() => {
    setButtons([
      {
        quantity: table.capacity.length,
        category: "Capacity",
        icon: PeopleAlt,
      },
      {
        quantity: table.queue.length,
        category: "Queue",
        icon: AssignmentTurnedIn,
      },
      {
        quantity: table.notification.length,
        category: "Notifications",
        icon: Notifications,
      },
      {
        quantity: table.alert.length,
        category: "Alert",
        icon: Announcement,
      },
    ]);
  }, [table]);
  return (
    <Grid container spacing={3} justify="center">
      <Grid item xs={12}>
        <ButtonGroup buttons={buttons} page="Queue" />
      </Grid>
      <Grid item xs={10}>
        <Paper className={classes.paper}>
          <Table />
        </Paper>
      </Grid>
    </Grid>
  );
}

// const mapStateToProps = (state) => {
//     return {
//         lang : state.lang
//     }
// }

// export default connect(mapStateToProps,null)(Home);
