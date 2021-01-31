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
import { useSelector } from "react-redux";
import { axiosInstance } from "../../network/apis";
import Auth from "../../utils/Auth";
import {
  dispatchSnackbarError,
  dispatchSnackbarSuccess,
} from "../../utils/Shared";
import Title from "./Title";

URL = "http://localhost:9000/api/visitors/getInfo"; //hardcode for now

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  button: {
    backgroundColor: theme.palette.primary.light,
  },
}));

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
      })
      .catch((error) => {
        console.log(error);
        if (error.response != undefined)
          dispatchSnackbarError(error.response.data);
        else console.log(error);
      });
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
          {rows !== undefined &&
            rows.map((row, i) => {
              return (
                (i < maxEvents || viewAll) && (
                  <TableRow key={row._id}>
                    <TableCell>
                      <Checkbox
                        icon={<CircleUnchecked />}
                        checkedIcon={<CircleCheckedFilled />}
                        onClick={() => {
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
                          handlePaid("Notification sent to " + row.name)
                        }
                      >
                        <span style={{ color: "white" }}>Notify</span>
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
