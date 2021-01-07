import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { Container, Row, Col, Jumbotron, button } from 'react-bootstrap';
import Logo from "../../assets/images/ScreenitLogo.png"

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    paddingTop: "10vh",
    paddingRight: "50vh",
    paddingLeft: "50vh",
    paddingBottom: "10vh",
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: theme.palette.primary.dark,
    height: "100vh",
    overflow: "auto",
  },
  formHeadRight: {       
    backgroundColor: theme.palette.primary.main,
    height: "20vh",
    width: "50vh",
    borderRadius: "11px",
    display: "flex",
    alignItems: "center",
    paddingLeft: "11%",
    color: "white",
    fontSize: "28px"
  },
  formHeadLeft: {       
    backgroundColor: theme.palette.primary.main,
    height: "20vh",
    width: "1vh",
    borderRadius: "11px",
    textAlign: "center",
    padding: '0'

  },
  formBody: {       
    backgroundColor: theme.palette.primary.main,	
    height: "100vh",
    width: "50vh",
    borderRadius: "11px",
  },
  headRow: {
  	paddingBottom: "8vh",
  }
}));

export default function CustomerForm(props) {
	const classes = useStyles();
    return(
        <div className={classes.content}>
	        <Container fluid>
	        <Row className={classes.headRow} >
	        	<Col xs={{ span: 3, offset: 1 }} sm={{ span: 3, offset: 1 }} md={{ span: 3, offset: 1 }} lg={{ span: 3, offset: 1 }} xl={{ span: 3, offset: 1 }} className={classes.formHeadLeft}>
	        		<img src={Logo} alt="ScreenIT" height="100%"></img>
		        </Col>

		        <Col xs={{ span: 6, offset: 1 }} sm={{ span: 6, offset: 1 }} md={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 1 }} xl={{ span: 6, offset: 1}} className={classes.formHeadRight}>
		            <p>Customer Form</p>
		        </Col>
		    </Row>	
	        <Row>
	        	<Col className={classes.formBody}>
		            <p>My laptop resolution is wierd, so things may look off for now</p>
		        	<TextField
			          id="standard-password-input"
			          label="Password"
			          type="password"
			          autoComplete="current-password"
			        />
		        </Col>
		    </Row>
	        </Container>
        </div>
    )   
}