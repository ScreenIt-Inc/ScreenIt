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
import { dispatchSnackbarSuccess } from "../../utils/Shared";
import { dispatchSnackbarError } from "../../utils/Shared";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../network/apis";
import Auth from "../../utils/Auth";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  button: {
    backgroundColor: theme.palette.primary.light,
  },
}));

function createData(id, name, number, group, date) {
  return { id, name, number, group, date };
}

const rows = [
  createData(0, "Justeen Randev", "+15197604419", "2", "78", 312.44),
  createData(7, "Andy Hameed", "+16479276093", "9", "78", 549.44),
  createData(1, "Gurnain Saini", "416-342-5436", "5", "75", 866.99),
  createData(2, "Tasmiha Hassan", "416-342-5436", "4", "98", 100.81),
  createData(3, "Beyonce Knowles", "416-342-5436", "1", "87", 654.39),
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
  const [paid] = useState(rows);
  function preventDefault(event) {
    setViewAll(!viewAll);
    event.preventDefault();
  }
  const maxEvents = 10;

  const classes = useStyles();
  const handlePaid = async (row) => {
    dispatchSnackbarSuccess("Notification sent to " + row.name);
    const token = Auth.isAuth()
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
    const requestOptions = {
      phoneNumber: row.number,
      name: row.name
    };
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
  const date = new Date();
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
          {paid.map((row, i) => {
            return (
              (i < maxEvents || viewAll) && (
                <TableRow key={row.id}>
                  <TableCell>
                    <Checkbox
                      icon={<CircleUnchecked />}
                      checkedIcon={<CircleCheckedFilled />}
                      onClick={() => {
                        console.log("checked");
                      }}
                    />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.number}</TableCell>
                  <TableCell>{row.group}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{date.getHours.toString()}</TableCell>
                  <TableCell align="right">
                    {" "}
                    <Button
                      variant="contained"
                      classes={classes.button}
                      color="primary"
                      style={{ borderRadius: 5 }}
                      onClick={() =>
                        handlePaid(row)
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
