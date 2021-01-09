import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { Container, Row, Col, Jumbotron, Button, Form } from 'react-bootstrap';
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
    color: "white",
    fontSize: "28px",
  },
  titleText: {
  	textAlign: "center",
	position: "relative",
	top: "50%",
	transform: "translateY(-50%)",
	fontFamily: "Monaco",
	fontSize: "130%"
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
    width: "50vh",
    borderRadius: "11px",
    paddingBottom: "3vh"
  },
  headRow: {
  	paddingBottom: "8vh",
  },
  innerFormDiv: {
  	borderRadius: "11px",
	  width: "95%",
	  padding: "9%",
	  margin: "0 auto",
	  backgroundColor: "white"
  }
}));

export default function CustomerForm(props) {
	const classes = useStyles();
	var user_data = {
		'firstname': '',
		'lastname': '',
		'email': '',
		'address': '',
		'phone': ''
	}

	const handleFormChange = (key, value) => {
    	user_data[key] = value;
  	};

  	const verifyData = () => {
  		return true
  	}
  	const handleSubmit = () => {
  		if (!verifyData()){
  			return
  		}


  	}

    return(
        <div className={classes.content}>
	        <Container fluid>
	        <Row className={classes.headRow} >
	        	<Col xs={{ span: 3, offset: 1 }} sm={{ span: 3, offset: 1 }} md={{ span: 3, offset: 1 }} lg={{ span: 3, offset: 1 }} xl={{ span: 3, offset: 1 }} className={classes.formHeadLeft}>
	        		<img src={Logo} alt="ScreenIT" height="100%"></img>
		        </Col>

		        <Col xs={{ span: 6, offset: 1 }} sm={{ span: 6, offset: 1 }} md={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 1 }} xl={{ span: 6, offset: 1}} className={classes.formHeadRight}>
		           	<div className={classes.titleText}>
		            	Information Form
		            </div>
		        </Col>
		    </Row>	
	        <Row>
	        	<Col className={classes.formBody}>
		            <br />
		            <div className={classes.innerFormDiv}>
						<Form>
						  <Form.Group controlId="formName">
						  <Form.Label>Name</Form.Label>
						  <Row>
						    <Col>
						      <Form.Control placeholder="First name" onChange={(event) => {handleFormChange('firstname', event.target.value)}}/>
						    </Col>
						    <Col>
						      <Form.Control placeholder="Last name" onChange={(event) => {handleFormChange('lastname', event.target.value)}}/>
						    </Col>
						  </Row>
						   </Form.Group>

						  <Form.Group controlId="formBasicEmail">
						    <Form.Label>Email address</Form.Label>
						    <Form.Control type="email" placeholder="Enter email" onChange={(event) => {handleFormChange('email', event.target.value)}}/>
						  </Form.Group>

						  <Form.Group controlId="formBasicPassword">
						    <Form.Label>Phone Number</Form.Label>
						    <Form.Control type="tel" placeholder="Phone Number" onChange={(event) => {handleFormChange('phone', event.target.value)}}/>
						  </Form.Group>

						  <Form.Group controlId="formBasicPassword">
						    <Form.Label>Address</Form.Label>
						    <Form.Control type="address" placeholder="Address" onChange={(event) => {handleFormChange('address', event.target.value)}}/>
						    <Form.Text className="text-muted">
						      We'll never share your information with anyone else.
						    </Form.Text>
						  </Form.Group>


						  <Button variant="primary" type="submit">
						    Submit
						  </Button>
						</Form>
					</div>
		        </Col>
		    </Row>
	        </Container>
        </div>
    )   
}