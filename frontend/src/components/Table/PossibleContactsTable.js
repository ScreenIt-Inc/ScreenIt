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
import {useSelector, useDispatch} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  button: {
    backgroundColor: theme.palette.primary.light
  }
}));

function createData(id, lastName, firstName, contactNumber, emailAddress){//}), entryDate, exitDate) {
  return { id, lastName, firstName, contactNumber, emailAddress }//, entryDate, exitDate };
}

const rows = [
  createData( 1, 'Snow', 'Jon', '123-456-7890', "name@email.com"),//, new Date(2020, 5, 5, 5, 20, 0), new Date(2020, 5, 5, 5, 40, 0) ),
  createData( 2, 'Lane', 'Carrie', '123-456-7890', "name@email.com"),//, new Date(2020, 5, 5, 5, 43, 0), new Date(2020, 5, 5, 6, 0, 0) ),
  createData( 3, 'Lane', 'Jaime', '123-456-7890', "name@email.com")//, new Date(2020, 5, 5, 5, 30, 0), new Date(2020, 5, 5, 5, 45, 0) )
];

export default function PossibleContactsTable(props) {
  const category = useSelector(state => state.table.category)
  const [viewAll, setViewAll] = useState(false);
  const [paid] = useState(rows);
  function preventDefault(event) {
    setViewAll(!viewAll)
    event.preventDefault();
  }
  const maxEvents = 10;

  const classes = useStyles();
  const handlePaid = (message) => {
    dispatchSnackbarSuccess(message);
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
        <Title>Possible Contacts</Title>
        <div className={classes.seeMore}>
          <Link color="primary" href="#" onClick={preventDefault}>
            View All
          </Link>
        </div>
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><b>First Name</b></TableCell>
            <TableCell><b>Last Name</b></TableCell>
            <TableCell><b>Contact Number</b></TableCell>
            <TableCell><b>Email Address</b></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paid.map((row, i) => {
            return ((i < maxEvents || viewAll) && <TableRow key={row.id}>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.contactNumber}</TableCell>
              <TableCell>{row.emailAddress}</TableCell>
              <TableCell align="right">
                {" "}
                <Button
                  variant="contained"
                  classes={classes.button}
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
/*
{ id: 4, lastName: 'Stark', firstName: 'Aria', contactNumber:'123-456-7890', emailAddress: "name@email.com", entryDate: new Date(2020, 5, 5, 5, 0, 0), exitDate: new Date(2020, 5, 5, 5, 15, 0) ),
{ id: 5, lastName: 'Trails', firstName: 'Dan', contactNumber:'123-456-7890', emailAddress: "name@email.com", entryDate: new Date(2020, 5, 5, 5, 10, 0), exitDate: new Date(2020, 5, 5, 5, 30, 0) ),
{ id: 6, lastName: 'Mercer', firstName: 'Max', contactNumber:'123-456-7890', emailAddress: "name@email.com", entryDate: new Date(2020, 10, 17, 3, 24, 0), exitDate: new Date(2020, 10, 17, 3, 26, 0) ),
{ id: 7, lastName: 'Clifford', firstName: 'Fiona', contactNumber:'123-456-7890', emailAddress: "name@email.com", entryDate: new Date(2020, 5, 5, 5, 10, 0), exitDate: new Date(2020, 5, 5, 5, 45, 0) ),
{ id: 8, lastName: 'Arrows', firstName: 'Ross', contactNumber:'123-456-7890', emailAddress: "name@email.com", entryDate: new Date(2020, 10, 17, 3, 23, 0), exitDate: new Date(2020, 10, 17, 3, 25, 0) ),
{ id: 9, lastName: 'Roxie', firstName: 'Harvey', contactNumber:'123-456-7890', emailAddress: "name@email.com", entryDate: new Date(2020, 5, 5, 5, 25, 0), exitDate: new Date(2020, 5, 5, 5, 35, 0) )
*/
