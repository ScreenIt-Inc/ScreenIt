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
import { axiosInstance } from "../../network/apis";
import { dispatchSnackbarError } from "../../utils/Shared";
import History from "../../routes/History";

import { DataGrid } from '@material-ui/data-grid';
import {TableContainer} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  button: {
    backgroundColor: theme.palette.primary.light,
  },
}));

const columns = [
  { field: 'customer', headerName: 'Customers', width: 200 },
  { field: 'phone', headerName: 'Contact Information', width: 200 },
  { field: 'entryDate', headerName: 'Entry Date', width: 150 },
  { field: 'timeDuration', headerName: 'Time Duration', width: 150 },
  { field: 'status', headerName: 'Status', width: 100 },
  { field: 'temperature', headerName: 'Entry Temperature', width: 200 }
];

class CustomersTable extends React.Component{
  state = {
    customers: [],
    possibleContacts: [],
    selectedRows: [],
    loading: false
  }

  componentDidMount(){
    this.getCustomers();
  }

  getCustomers(){
    axiosInstance
      .get("/form/getForms")
      .then((response) => {
        const serverResponse = response.data;
        console.log(serverResponse);
        var i = 1;
        var newCustomers = serverResponse.map(item => ({
          id: item._id,
          customer: item.firstname + " " + item.lastname,
          firstName: item.firstname,
          lastName: item.lastname,
          phone: item.phone,
          email: item.email,
          status: "Safe",
          entryDate: (item.hasOwnProperty("entry_time")) ? (new Date(item.entry_time)).getMonth().toString() + "/" + (new Date(item.entry_time)).getDay().toString() + "/" + (new Date(item.entry_time)).getFullYear().toString() : "has not entered",
          timeDuration: (item.hasOwnProperty("entry_time") && item.hasOwnProperty("exit_time")) ? (new Date(item.entry_time)).getHours().toString() + ":" + this.addZero((new Date(item.entry_time)).getMinutes()).toString() + " to " + (new Date(item.exit_time)).getHours().toString() + ":" + this.addZero((new Date(item.exit_time)).getMinutes()).toString() : "has not exited",
          temperature: item.temp,
          //exitDate: item.exit_time
          //groupSize: item.group,
        }));
        this.setState({ customers: newCustomers });
      })
      .catch((error) => {
        dispatchSnackbarError(error.response);
      });
  };

  contactTrace(newSelectedRows){
    console.log(newSelectedRows.rowIds);
    this.setState({ selectedRows: newSelectedRows.rowIds })
    const requestOptions = {
        infectedCustomerIds:  newSelectedRows.rowIds
    };
    axiosInstance
      .post("/form/contactTrace", requestOptions)
      .then((response) => {
        const serverResponse = response.data;
        console.log(serverResponse);

        this.setState({ possibleContacts: [...serverResponse.data] }, this.updateStatus(serverResponse.data, newSelectedRows.rowIds));
      })
      .catch((error) => {
        dispatchSnackbarError(error.response);
      });
  }

  addZero(i){
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  updateStatus(possibleContacts, selectedRows){
    var newCustomers = [...this.state.customers]

    for (var i = 0; i < newCustomers.length; i++) {
      if (possibleContacts.includes(newCustomers[i].id)){
        newCustomers[i].status = "At Risk";
      }
      else if (selectedRows.includes(newCustomers[i].id)){
        newCustomers[i].status = "Infected";
      }
      else{
        newCustomers[i].status = "Safe";
      }
    }
    console.log(newCustomers)
    this.setState({ customers: [...newCustomers] });
  }


  render(){
    return (
      <div style={{ padding: 10 }}>
        <Title>Records</Title>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={this.state.customers}
            columns={columns}
            pageSize={9}
            sortingMode='client' sortingOrder={['asc', 'desc', null]}
            loading={this.state.loading}
            checkboxSelection
            onSelectionChange={newSelectedRows => this.contactTrace(newSelectedRows)}
          />
        </div>
      </div>
    );
  }
}

export default CustomersTable;
//this.setState({selectedRows: newSelectedRows.rowIds})}
/*
  contactTrace = (selectedRows) => {
    let infectedCustomers = this.state.customers.filter(customer => this.state.selectedRows.includes(customer.id.toString()));
    let newPossibleContacts = this.state.customers.filter(possibleContact => (
      infectedCustomers.some(infectedCustomer => (
        (possibleContact.entryDate <= infectedCustomer.exitDate) && (possibleContact.exitDate >= infectedCustomer.entryDate)
          && (possibleContact.id != infectedCustomer.id))
    )
    ));

    this.setState({
      possibleContacts: newPossibleContacts
    })
  }
  */
/*
const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', contactNumber:'123-456-7890', emailAddress: "name@email.com", entryDate: new Date(2020, 5, 5, 5, 20, 0), exitDate: new Date(2020, 5, 5, 5, 40, 0) },
  { id: 2, lastName: 'Lane', firstName: 'Carrie', contactNumber:'123-456-7890', emailAddress: "name@email.com", entryDate: new Date(2020, 5, 5, 5, 43, 0), exitDate: new Date(2020, 5, 5, 6, 0, 0) },
  { id: 3, lastName: 'Lane', firstName: 'Jaime', contactNumber:'123-456-7890', emailAddress: "name@email.com", entryDate:new Date(2020, 5, 5, 5, 30, 0), exitDate:new Date(2020, 5, 5, 5, 45, 0) },
  { id: 4, lastName: 'Stark', firstName: 'Aria', contactNumber:'123-456-7890', emailAddress: "name@email.com", entryDate: new Date(2020, 5, 5, 5, 0, 0), exitDate: new Date(2020, 5, 5, 5, 15, 0) },
  { id: 5, lastName: 'Trails', firstName: 'Dan', contactNumber:'123-456-7890', emailAddress: "name@email.com", entryDate: new Date(2020, 5, 5, 5, 10, 0), exitDate: new Date(2020, 5, 5, 5, 30, 0) },
  { id: 6, lastName: 'Mercer', firstName: 'Max', contactNumber:'123-456-7890', emailAddress: "name@email.com", entryDate: new Date(2020, 10, 17, 3, 24, 0), exitDate: new Date(2020, 10, 17, 3, 26, 0) },
  { id: 7, lastName: 'Clifford', firstName: 'Fiona', contactNumber:'123-456-7890', emailAddress: "name@email.com", entryDate: new Date(2020, 5, 5, 5, 10, 0), exitDate: new Date(2020, 5, 5, 5, 45, 0) },
  { id: 8, lastName: 'Arrows', firstName: 'Ross', contactNumber:'123-456-7890', emailAddress: "name@email.com", entryDate: new Date(2020, 10, 17, 3, 23, 0), exitDate: new Date(2020, 10, 17, 3, 25, 0) },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', contactNumber:'123-456-7890', emailAddress: "name@email.com", entryDate: new Date(2020, 5, 5, 5, 25, 0), exitDate: new Date(2020, 5, 5, 5, 35, 0) },
  { id: 10, lastName: 'Roxie', firstName: 'Harvey', contactNumber:'123-456-7890', emailAddress: "name@email.com", entryDate: new Date(2020, 5, 5, 5, 25, 0), exitDate: new Date(2020, 5, 5, 5, 35, 0) }
];



<div style={{ height: 300, width: '100%' }}>
  <DataGrid
    rows={this.state.possibleContacts}
    columns={columns}
    pageSize={3}
    sortingMode='client' sortingOrder={['asc', 'desc', null]}
    loading={this.state.loading}
  />
</div>
*/

/*
componentWillMount() {
    this.callAPI();
}

callAPI() {
  fetch("http://localhost:9000/testAPI")
      .then(res => res.json())
      .then(res => this.setState({ customers: res, loading: false }), () => this.formatDates());
}

formatDates = () => {
  let formatedCustomers = this.state.customers.forEach((item, i) => {
    item.entryDate = new Date(JSON.parse(item.entryDate));
  });

  this.setState({
    customers: formatedCustomers
  })

  //row.exitDate = new Date(JSON.parse(row.exitDate));
}
*/



/*
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

export default function CustomersTable(props) {
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
        <Title>Customers</Title>
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
            <TableCell><b>First Name</b></TableCell>
            <TableCell><b>Last Name</b></TableCell>
            <TableCell><b>Contact Number</b></TableCell>
            <TableCell><b>Email Address</b></TableCell>
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
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.contactNumber}</TableCell>
              <TableCell>{row.emailAddress}</TableCell>
            </TableRow>)
          })}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
*/

/*
{ id: 4, lastName: 'Stark', firstName: 'Aria', contactNumber:'123-456-7890', emailAddress: "name@email.com", entryDate: new Date(2020, 5, 5, 5, 0, 0), exitDate: new Date(2020, 5, 5, 5, 15, 0) ),
{ id: 5, lastName: 'Trails', firstName: 'Dan', contactNumber:'123-456-7890', emailAddress: "name@email.com", entryDate: new Date(2020, 5, 5, 5, 10, 0), exitDate: new Date(2020, 5, 5, 5, 30, 0) ),
{ id: 6, lastName: 'Mercer', firstName: 'Max', contactNumber:'123-456-7890', emailAddress: "name@email.com", entryDate: new Date(2020, 10, 17, 3, 24, 0), exitDate: new Date(2020, 10, 17, 3, 26, 0) ),
{ id: 7, lastName: 'Clifford', firstName: 'Fiona', contactNumber:'123-456-7890', emailAddress: "name@email.com", entryDate: new Date(2020, 5, 5, 5, 10, 0), exitDate: new Date(2020, 5, 5, 5, 45, 0) ),
{ id: 8, lastName: 'Arrows', firstName: 'Ross', contactNumber:'123-456-7890', emailAddress: "name@email.com", entryDate: new Date(2020, 10, 17, 3, 23, 0), exitDate: new Date(2020, 10, 17, 3, 25, 0) ),
{ id: 9, lastName: 'Roxie', firstName: 'Harvey', contactNumber:'123-456-7890', emailAddress: "name@email.com", entryDate: new Date(2020, 5, 5, 5, 25, 0), exitDate: new Date(2020, 5, 5, 5, 35, 0) )
*/
