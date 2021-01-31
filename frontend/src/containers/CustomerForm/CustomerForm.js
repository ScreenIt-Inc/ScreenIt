import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { Container, Row, Col, Jumbotron, Button, Form } from 'react-bootstrap';
import Logo from "../../assets/images/ScreenitLogo.png"

const BASE_URL = 'http://localhost:9000' //hardcode for now
const SUBMIT_ENDPOINT = '/api/form/submission'
const GET_NAIRE_ENDPOINT = '/api/form/questionnaire'
const GET_UUIDS_ENDPOINT = '/api/form/openformuuids'

const useStyles = theme => ({
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
	fontSize: "130%",

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
  },
  headerQuestion: {
    fontWeight: 'bold',
    color: theme.palette.primary.light
  },
  baseQuestion: {
    fontWeight: 'bold',
    color: theme.palette.secondary.light
  },
  centerDiv: {
	textAlign: 'center',
  }
});

class CustomerForm extends React.Component{
	constructor(props){
		super(props);
		this.uuid = this.props.computedMatch.params.uuid;
		this.state = {
			user_data: {
				'uuid': '',
				'firstname': '',
				'lastname': '',
				'email': '',
				'address': '',
				'phone': '',
				'questionnaire': {},
				'entry_time': new Date(0,0,0,0,0,0,0),
				'exit_time': new Date(0,0,0,0,0,0,0)
			},
			'pulled': false,
			'approved': 'Unkown',
			questionnaire:
				[
					{
						'question': 'Do you have any of the following new or worsening symptoms or signs?',
						'answers': [],
						'isHeader': true,
						'id': 0
					},
					{
						'question': 'Fevers or Chills',
						'answers': ['Yes', 'No'],
						'isHeader': false,
						'id': 1
					},
					{
						'question': 'Cough',
						'answers': ['Yes', 'No'],
						'isHeader': false,
						'id': 2
					},
					{
						'question': 'Difficulty breathing or shortness of breath',
						'answers': ['Yes', 'No'],
						'isHeader': false,
						'id': 3
					},
					{
						'question': 'Sore throat, trouble swallowing',
						'answers': ['Yes', 'No'],
						'isHeader': false,
						'id': 4
					},
					{
						'question': 'Runny or stuffy nose',
						'answers': ['Yes', 'No'],
						'isHeader': false,
						'id': 5
					},
					{
						'question': 'Decrease or loss of taste or smell',
						'answers': ['Yes', 'No'],
						'isHeader': false,
						'id': 6
					},
					{
						'question': 'Have you come in contact with someone who has tested postive for Covid-19?',
						'answers':['Yes', 'No'],
						'isHeader': true,
						'id': 7
					},
					{
						'question': 'Have you traveled outside of Canada in the past 14 days?',
						'answers':['Yes', 'No'],
						'isHeader': true,
						'id': 8
					},
				]
			}
	}

	componentDidMount() {

	    fetch(BASE_URL + GET_NAIRE_ENDPOINT)
  		  .then(function(stream) {
  		  		return stream.json() // convert 'ReadableStream' and returns a promise to convert to json
  		  }).then(function(data) {
	  		  	data.questionnaire.forEach(function (item, index, array) {
	  		  		item['id'] = index
	  		  	});
	  		  	this.setState({
	  		  		pulled: true,
	  		  		questionnaire: data.questionnaire
	  		  	});
  		  }.bind(this)).catch(function(error) { //make sure to bind for above set state
			  	console.log('Error pulling database questions, using default')
			  	console.log(error)
		  });

	    fetch(BASE_URL + GET_UUIDS_ENDPOINT)
  		  .then(function(stream) {
  		  		return stream.json() // convert 'ReadableStream' and returns a promise to convert to json
  		  }).then(function(data) {
	  		  	console.log(data)
	  		  	console.log(this.uuid)
	  		  	for (var i = 0; i < data.length; i++){
	  		  		console.log(data[i].uuid, this.uuid)
	  		  		if (data[i].uuid == this.uuid){
	  		  			this.setState({
			  		  		approved: 'Yes'

			  		  	});
			  		  	return
			  		}
	  		  	}

				this.setState({
			  		approved: 'Denied',
			  	});

  		  }.bind(this)).catch(function(error) { //make sure to bind for above set state
			  	console.log('Error pulling uuid, unable to grant access')
			  	console.log(error)
		  });
  	}


	handleFormChange = (key, value) => {
    	this.state.user_data[key] = value;
  	}


  	verifyData = () => {
  		return true;
  	}


  	postData = () => {
  		console.log(JSON.stringify(this.state.user_data))
  		fetch(BASE_URL + SUBMIT_ENDPOINT, {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(this.state.user_data)
		});

  	}


  	handleSubmit = () => {
  		if (!this.verifyData.bind(this)()){
  			//indicate error here
  			return;
  		}

  		this.postData.bind(this)();
  		this.setState({
  			approved: 'Submitted'
  		})

  	}

  	handletoggle = (question, value) => {
  		this.state.user_data.questionnaire[question] = value;
  		this.setState({
  			user_data: this.state.user_data
  		})
  	}

  	render() {
  		const { classes } = this.props;
		if (this.state.approved == 'Denied'){
	  		return (
	  			<div className={[classes.content, classes.headerQuestion].join(" ")}>
	  				Denied...
	  			</div>

	  		)
		}
		else if (this.state.approved == 'Submitted'){
			return (
	  			<div className={[classes.content, classes.headerQuestion].join(" ")}>
					Thank you, your form has been submitted'
	  			</div>
	  		)
		}
  		else if (!(this.state.pulled && (this.state.approved == 'Yes'))){
	  		return (
	  			<div className={[classes.content, classes.headerQuestion].join(" ")}>
	  				LOADING...
	  			</div>

	  		)
		}
		else {
		    return (
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
								  <Form.Label className={classes.headerQuestion}>Name</Form.Label>
								  <Row>
								    <Col>
								      <Form.Control placeholder="First name" onChange={(event) => {this.handleFormChange.bind(this)('firstname', event.target.value)}}/>
								    </Col>
								    <Col>
								      <Form.Control placeholder="Last name" onChange={(event) => {this.handleFormChange.bind(this)('lastname', event.target.value)}}/>
								    </Col>
								  </Row>
								   </Form.Group>

								  <Form.Group controlId="formBasicEmail">
								    <Form.Label className={classes.headerQuestion}>Email address</Form.Label>
								    <Form.Control type="email" placeholder="Enter email" onChange={(event) => {this.handleFormChange.bind(this)('email', event.target.value)}}/>
								  </Form.Group>

								  <Form.Group controlId="formBasicPassword">
								    <Form.Label className={classes.headerQuestion}>Phone Number</Form.Label>
								    <Form.Control type="tel" placeholder="Phone Number" onChange={(event) => {this.handleFormChange.bind(this)('phone', event.target.value)}}/>
								  </Form.Group>

								  <Form.Group controlId="formBasicPassword">
								    <Form.Label className={classes.headerQuestion}>Address</Form.Label>
								    <Form.Control type="address" placeholder="Address" onChange={(event) => {this.handleFormChange.bind(this)('address', event.target.value)}}/>
								    <Form.Text className="text-muted">
								      We'll never share your information with anyone else.
								    </Form.Text>
								  </Form.Group>
							    	{
						                this.state.questionnaire.map(Q =>
							                	Q.isHeader
									                ?
									                	<div key={Q.id}>
									                		<br />
										                	<Row>
										    					<Col>
											                  		<Form.Label className={classes.headerQuestion}>{Q.question}</Form.Label>
											                  	</Col>
													    	</Row>
													    	<Row>
											                  	<Col>
											                  		{
											                  			Q.answers.map(A =>
											                  				<Form.Check inline label={A} type='radio' id={A} onClick={(event) => {this.handletoggle.bind(this)(Q.question, A)}}/>
											                  			)
											                  		}
											                  	</Col>
											                </Row>
											            </div>

								                	:
								                		<Row key={Q.id}>
									    					<Col>
										                  		<Form.Label className={classes.baseQuestion}>{Q.question}</Form.Label>
										                  	</Col>
										                  	<Col>
										                  		{
										                  			Q.answers.map(A =>
										                  				<Form.Check inline label={A} type='radio' id={A} onClick={(event) => {this.handletoggle.bind(this)(Q.question, A)}}/>
										                  			)
										                  		}
										                  	</Col>
												    	</Row>

						                )
					              	}
					              	<br />
					              	<div className={classes.centerDiv}>
										<Button variant="info" type="submit" onClick={this.handleSubmit.bind(this)}>
											Submit
										</Button>
									</div>
								</Form>
							</div>
				        </Col>
				    </Row>

			        </Container>
		        </div>
		    )
		}
	}

}

export default withStyles(useStyles)(CustomerForm);
