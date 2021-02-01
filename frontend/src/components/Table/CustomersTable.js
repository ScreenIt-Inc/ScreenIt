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
import { CSVLink, CSVDownload } from "react-csv";

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
  { field: 'timeDuration', headerName: 'Time Duration', width: 170 },
  { field: 'status', headerName: 'Status', width: 100 },
  { field: 'temperature', headerName: 'Entry Temperature', width: 180 }
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
          timeDuration: (item.hasOwnProperty("entry_time") && item.hasOwnProperty("exit_time"))
                ? this.make12hour((new Date(item.entry_time)).getHours()).toString() + ":"
                 + this.addZero((new Date(item.entry_time)).getMinutes()).toString()
                 + this.getAbbrieviation((new Date(item.entry_time)).getHours())
                 + " to "
                 + this.make12hour((new Date(item.exit_time)).getHours()).toString()+ ":"
                 + this.addZero((new Date(item.exit_time)).getMinutes()).toString()
                 + this.getAbbrieviation((new Date(item.exit_time)).getHours())
                :
                "has not exited",
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

  getAbbrieviation(i){
    if (i < 12){
      return "AM"
    }
    return "PM"
  }

  make12hour(i){
    if (i == 0){
      return 12;
    }
    if (i > 12){
      return i-12;
    }
    return i;
  }

  updateStatus(possibleContacts, selectedRows){
    var newCustomers = [...this.state.customers]

    for (var i = 0; i < newCustomers.length; i++) {
      if (selectedRows.includes(newCustomers[i].id)){
        newCustomers[i].status = "Infected";
      }
      else if (possibleContacts.includes(newCustomers[i].id)){
        newCustomers[i].status = "At Risk";
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
        <br/>
        <CSVLink
          data={this.state.customers}
          filename={(new Date()).getDate().toString() + "-" + ((new Date()).getMonth() + 1).toString() + "-" + (new Date()).getFullYear().toString() +".csv"}
          >
          Download Records
        </CSVLink>
      </div>
    );
  }
}

export default CustomersTable;

//(new Date()).getDate().toString() + "-" +
//+ (new Date()).getFullYear().toString()
