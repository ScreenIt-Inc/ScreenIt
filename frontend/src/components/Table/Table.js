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
import UpdateIcon from "@material-ui/icons/Update";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Title from "./Title";
import { dispatchSnackbarSuccess } from "../../utils/Shared";
import { useSelector } from "react-redux";
import Auth from "../../utils/Auth";

URL = "http://localhost:9000/api/visitors/getInfo"; //hardcode for now

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  button: {
    backgroundColor: theme.palette.primary.light,
  },
}));

function createData(_id, firstname, lastname, phone, date) {
  return { _id, firstname, lastname, phone, date };
}

const rowsDefault = [
  createData(
    0,
    "Justeen",
    "Randev",
    "416-342-5436",
    "2021-01-28T23:31:04.915Z"
  ),
  createData(1, "Gurnain", "Saini", "416-342-5436", "2021-01-28T23:31:04.915Z"),
  createData(
    2,
    "Tasmiha",
    "Hassan",
    "416-342-5436",
    "2021-01-28T23:31:04.915Z"
  ),
  createData(
    3,
    "Beyonce",
    "Knowles",
    "416-342-5436",
    "2021-01-28T23:31:04.915Z"
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
  const category = useSelector((state) => state.table.category);
  const [viewAll, setViewAll] = useState(false);
  const [rows, setRows] = useState([]);

  function preventDefault(event) {
    setViewAll(!viewAll);
    event.preventDefault();
  }
  const maxEvents = 10;

  const classes = useStyles();
  const handlePaid = (message) => {
    dispatchSnackbarSuccess(message);
  };
  const date = new Date();

  const getVisitorInfo = () => {
    console.log("getting visitor information");
    fetch(URL, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + Auth.isAuth(),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        var newEntries = data.filter((obj1) => {
          return !rows.some((obj2) => {
            return obj1._id == obj2._id;
          });
        });
        setRows(rows.concat(newEntries));
        console.log(rows);
      })
      .catch();
  };

  return (
    <React.Fragment>
      <div
        style={{
          justifyContent: "space-between",
          alignContent: "space-between",
          display: "flex",
        }}
      >
        <Title>{category}</Title>
        <div className={classes.seeMore}>
          <IconButton
            onClick={getVisitorInfo}
            style={{ marginRight: "10px" }}
            color="primary"
            aria-label="add to shopping cart"
          >
            <UpdateIcon />
          </IconButton>
          <Link color="primary" href="#" onClick={preventDefault}>
            View All
          </Link>
        </div>
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              <b>Name</b>
            </TableCell>
            <TableCell>
              <b>Contact Number</b>
            </TableCell>
            <TableCell>
              <b>Group Size</b>
            </TableCell>
            <TableCell>
              <b>Temperature</b>
            </TableCell>
            <TableCell>
              <b>Time</b>
            </TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {category === "Queue" &&
            rows !== undefined &&
            rows.filter((r) => r.hasEntered === undefined)
              .map((row, i) => {
              return (
                (i < maxEvents || viewAll) && (
                  <TableRow key={row._id}>
                    <TableCell>
                      <Checkbox
                        icon={<CircleUnchecked />}
                        checkedIcon={<CircleCheckedFilled />}
                        onClick={() => {
                          const newRows = rows;
                          newRows[i]["hasEntered"] = true;
                          newRows[i]["entry_time"] = new Date().toLocaleDateString();
                          setRows(newRows);
                                                    
                          console.log("checked");
                        }}
                      />
                    </TableCell>
                    <TableCell>{row.firstname + " " + row.lastname}</TableCell>
                    <TableCell>{row.phone.slice(0, 10)}</TableCell>
                    <TableCell>{1}</TableCell>
                    <TableCell>{35}</TableCell>
                    <TableCell>
                      {new Date(row.createdAt).toLocaleTimeString()}
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      <Button
                        variant="contained"
                        classes={classes.button}
                        color="primary"
                        style={{ borderRadius: 5 }}
                        onClick={() =>
                          handlePaid("Notification sent to " + row.firstname + ' ' + row.lastname)
                        }
                      >
                        <span style={{ color: "white" }}>Notify</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              );
            })}
            {category === "Capacity" &&
            rows !== undefined &&
            rows.filter((r) => r.hasEntered === true)
              .map((row, i) => {
              return (
                (i < maxEvents || viewAll) && (
                  <TableRow key={row._id}>
                    <TableCell>
                      <Checkbox 
                        disabled = {true}
                        checked = {true}
                        icon={<CircleUnchecked />}
                        checkedIcon={<CircleCheckedFilled />}
                      />
                    </TableCell>
                    <TableCell>{row.firstname + " " + row.lastname}</TableCell>
                    <TableCell>{row.phone.slice(0, 10)}</TableCell>
                    <TableCell>{1}</TableCell>
                    <TableCell>{35}</TableCell>
                    <TableCell>
                      {new Date(row.createdAt).toLocaleTimeString()}
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      <Button
                        variant="contained"
                        classes={classes.button}
                        color="primary"
                        style={{ borderRadius: 5 }}
                        onClick={() => { 
                          const newRows = rows;
                          const message = row.firstname + " " + row.lastname + " has been removed.";
                          dispatchSnackbarSuccess(message);
                          newRows[i]["exit_time"] = new Date().toLocaleDateString();
                          newRows.splice(i, 1);
                          setRows(newRows);                          
                          }
                        }
                      >
                        <span style={{ color: "white" }}>Exit</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              );
            })}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
