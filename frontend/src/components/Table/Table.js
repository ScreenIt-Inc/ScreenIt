// Boilerplate for the orders table found on every page.
import * as React from "react";
import { useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import Button from "@material-ui/core/Button";
import Title from "./Title";
import { useSnackbar } from "notistack";


const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

function createData(id, name, amount, item, date) {
  return { id, name, amount, item, date };
}

const rows = [
  createData(
    0,
    "Justeen Randev",
    "416-342-5436",
    "2",
    "78",
    312.44
  ),
  createData(
    1,
    "Gurnain Saini",
    "416-342-5436",
    "5",
    "75",
    866.99
  ),
  createData(
    2,
    "Tasmiha Hassan",
    "416-342-5436",
    "4",
    "98",
    100.81
  ),
  createData(
    3,
    "Beyonce Knowles",
    "416-342-5436",
    "1",
    "87",
    654.39
  ),
  createData(
    4,
    "Khaleesi Mother of Dragons",
    "416-342-5436",
    "4",
    "77",
    212.79
  ),
];

export default function TableQ(props) {
  const [viewAll, setViewAll] = useState(false);
  const [paid] = useState(rows);
  function preventDefault(event) {
    setViewAll(!viewAll)
    event.preventDefault();
  }
  const maxEvents = 10;

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const handlePaid = (message) => {
    enqueueSnackbar(message, { variant: "default" });
  }
  const date = new Date()
  return (
    <React.Fragment>
      <div
        style={{
          justifyContent: "space-between",
          alignContent: "space-between",
          display: "flex",
        }}
      >
        <Title>Waiting List</Title>
        <div className={classes.seeMore}>
          <Link color="primary" href="#" onClick={preventDefault}>
            View All
          </Link>
        </div>
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Contact Number</b></TableCell>
            <TableCell><b>Group Size</b></TableCell>
            <TableCell><b>Temperature</b></TableCell>
            <TableCell><b>Time</b></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paid.map((row, i) => {
            return ((i < maxEvents || viewAll) && <TableRow key={row.id}>
              <TableCell>
                <Checkbox
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleCheckedFilled />}
                  onClick={() => {
                    console.log('checked')
                  }}
                />
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.item}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{date.getHours.toString()}</TableCell>
              <TableCell align="right">
                {" "}
                <Button
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: 5 }}
                  onClick={() => handlePaid("Notification sent to "+row.name)}
                >
                  <span style={{color: "white"}} >Notify</span>
                </Button>
              </TableCell>
            </TableRow>)
          })}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
