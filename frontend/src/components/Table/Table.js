// Boilerplate for the orders table found on every page.
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import UpdateIcon from "@material-ui/icons/Update";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../network/apis";
import { setCurrentTable } from "../../store/Table/TableAction";
import Auth from "../../utils/Auth";
import {
  dispatchSnackbarError,
  dispatchSnackbarSuccess,
} from "../../utils/Shared";
import Title from "./Title";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  button: {
    backgroundColor: theme.palette.primary.light,
  },
}));

export default function TableQ(props) {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.table.category);
  const [viewAll, setViewAll] = useState(false);
  const [rows, setRows] = useState([]);

  function preventDefault(event) {
    setViewAll(!viewAll);
    event.preventDefault();
  }
  const maxEvents = 10;

  const classes = useStyles();
  const handlePaid = async (row, message) => {
    dispatchSnackbarSuccess(
      "Notification sent to " + row.firstname + " " + row.lastname
    );
    const token = Auth.isAuth();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const requestOptions = {
      msg: message,
      phoneNumber: row.phone,
      name: row.firstname + " " + row.lastname,
    };
    console.log(requestOptions);
    console.log("row", row);
    await axiosInstance
      .post("/notify/sendText", requestOptions, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        // console.log(error.response.data.errors.message);
        console.log(error);
        dispatchSnackbarError(error.response.data);
      });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getVisitorInfo();
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const getVisitorInfo = async () => {
    const config = {
      headers: { Authorization: `Bearer ${Auth.isAuth()}` },
    };
    axiosInstance
      .get("/visitors/getInfo", config)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        var newEntries = data.filter((obj1) => {
          return !rows.some((obj2) => {
            return obj1._id == obj2._id;
          });
        });
        setRows([...rows, ...newEntries]);
        dispatch(
          setCurrentTable({
            queue: [...rows, ...newEntries].filter(
              (r) => r.entry_time === undefined
            ),
            capacity: [...rows, ...newEntries].filter(
              (r) => r.entry_time !== undefined && r.exit_time == undefined
            ),
          })
        );
      })
      .catch((error) => {
        console.log(error);
        if (error.response != undefined)
          dispatchSnackbarError(error.response.data);
        else console.log(error);
      });
  };

  const postVisitorInfo = async (targetField, targetValue, formId) => {
    const config = {
      headers: { Authorization: `Bearer ${Auth.isAuth()}` },
    };
    const requestOptions = {
      field: targetField,
      value: targetValue,
      id: formId,
    };
    await axiosInstance
      .post("/visitors/updateInfo", requestOptions, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        if (error.response != undefined)
          dispatchSnackbarError(error.response.data);
        else console.log(error);
      });
    getVisitorInfo();
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
            rows
              .filter((r) => r.entry_time === undefined)
              .map((row, i) => {
                return (
                  (i < maxEvents || viewAll) && (
                    <TableRow key={row._id}>
                      <TableCell>
                        <Checkbox
                          icon={<CircleUnchecked />}
                          checkedIcon={<CircleCheckedFilled />}
                          onClick={() => {
                            const entryTime = new Date();
                            // update form table with entry time
                            postVisitorInfo("entry_time", entryTime, row._id);
                            console.log("checked");
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {row.firstname + " " + row.lastname}
                      </TableCell>
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
                            const message =
                              "Thank you for your patience. Please make your way in!";
                            handlePaid(row, message);
                          }}
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
            rows
              .filter(
                (r) => r.entry_time !== undefined && r.exit_time == undefined
              )
              .map((row, i) => {
                return (
                  (i < maxEvents || viewAll) && (
                    <TableRow key={row._id}>
                      <TableCell>
                        <Checkbox
                          disabled={true}
                          checked={true}
                          icon={<CircleUnchecked />}
                          checkedIcon={<CircleCheckedFilled />}
                        />
                      </TableCell>
                      <TableCell>
                        {row.firstname + " " + row.lastname}
                      </TableCell>
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
                            const message =
                              row.firstname +
                              " " +
                              row.lastname +
                              " has been removed.";
                            const exitTime = new Date();
                            dispatchSnackbarSuccess(message);
                            // post exit_time field update into DB
                            postVisitorInfo("exit_time", exitTime, row._id);
                          }}
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
