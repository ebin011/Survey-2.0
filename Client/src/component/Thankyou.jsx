import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import request from 'superagent';
import {IndexLink, Link} from 'react-router';
const paperStyle={

	height:'100%'
};
const cardHeaderStyle={

	background:'#242323',
	textAlign:'center'
};
const cardTitleStyle={
   color:'#FFFFFF',
   fontSize:'125%',
   fontWeight:'bold'
}

class Thankyou extends Component
{

constructor(props) {
   super(props);
   this.state = {
   expanded: false,
   expandedNumber:false,
   expandedMail:false,
	 thankyouMsg:'',
	 name:'',
	 email:'',
	 contact:'',
	 disable:true
    };
  }

 handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  };

  handleToggleNumber = (event, toggle) => {
    this.setState({expandedNumber: toggle});
  };

  handleToggleMail = (event, toggle) => {
    this.setState({expandedMail: toggle});
  };

    componentWillMount(){
    this.props.type("Thanks");
  }

   handleThanks(e) {
		 if(e.target.value.length>=5)
		 {
			 this.setState({
				 disable:false
			 })
		 }
		 else {
			 this.setState({
 				disable:true
 			})
		 }
    this.props.getThanks(e.target.value);
		this.setState({
			thankyouMsg:e.target.value
		})
    console.log("Sucess");
  }

   handleName(e) {

    this.props.getName(e.target.value);
		this.setState({
			name:e.target.value
		})
    console.log("Sucess");
  }

   handleContact(e) {

    this.props.getContact(e.target.value);
		this.setState({
			contact:e.target.value
		})
    console.log("Sucess");
  }

   handleEmail(e) {

    this.props.getEmail(e.target.value);
		this.setState({
			email:e.target.value
		})
    console.log("Sucess");
  }
	updateDb(){
		var sName=localStorage.getItem('sName');
		console.log("getin thank");
		var thankyouScreen={
			sName:localStorage.getItem('sName'),
			"type":'thanksMessage',
			"createrEmail":this.state.email,
			"createrName":this.state.name,
			"thanksMessage":this.state.thankyouMsg,
			"createrContact":this.state.contact
		}
		request.post('http://10.42.0.130:9080/api/updateSurvey/'+sName)
						.set('Content-Type', 'application/json')
						.send(thankyouScreen)
						 .end((err,res)=>
						 {
						 	if(err)
						 	{

							 console.log(err);
						 	}
						 	else
						 	{
						 		console.log("not err");
						 	}
							})
	}
	render()
	{
		var url="Home/AddQuestion/"+localStorage.getItem("sName");
		return(
				<div >

					<Paper style={{paperStyle}}>
						<Card expanded={this.state.expanded} style={{background:'#E5E4E2'}}>
							<CardHeader title='Thank You Screen' subtitle='Design your Thank you part' subtitleColor='#FFFFFF' style={cardHeaderStyle} titleStyle={cardTitleStyle} >
							</CardHeader>
							<CardActions style={{marginTop:'3%',marginLeft:'1%'}}>
								<Subheader style={{fontSize:'125%',color:'#1C6D03'}}>Message</Subheader>
								<TextField
								    hintText="Thank you text goes here"
								    hintStyle={{fontWeight:'bold'}}
								    underlineStyle={{borderColor:'#37861E'}}
								    onChange={this.handleThanks.bind(this)}
								    required
								    multiLine={true}
								    fullWidth={true}
								/>
							</CardActions>
							<Divider style={{background:'#000000'}}/>
							<CardActions style={{marginTop:'3%',marginLeft:'1%'}}>
							<Subheader style={{fontSize:'125%',color:'#1C6D03'}}>Creator Name</Subheader>
							<Toggle
							 toggled={this.state.expanded}
							 onToggle={this.handleToggle}></Toggle>
							</CardActions>

							<CardActions expandable={true}>
         						<TextField
         						    hintText="Type Your Name Here (Optional)"
         						    hintStyle={{fontWeight:'bold'}}
         						    onChange={this.handleName.bind(this)}
         						    underlineStyle={{borderColor:'#37861E'}}
								    multiLine={true}
         						     />
        					</CardActions>
        					</Card>
        					<Divider style={{background:'#000000'}}/>


        					<Card expanded={this.state.expandedNumber} style={{background:'#E5E4E2',marginTop:'0px'}}>
        					<CardActions style={{marginTop:'0px',marginLeft:'1%'}}>
							<Subheader style={{fontSize:'125%',color:'#1C6D03',marginTop:'3%'}}>Creator Contact Number</Subheader>
							<Toggle
							 toggled={this.state.expandedNumber}
							 onToggle={this.handleToggleNumber}></Toggle>
							</CardActions>

							<CardActions expandable={true}>
         						<TextField
         						    hintText="Type Your Contact Number Here (Optional)"
         						    hintStyle={{fontWeight:'bold'}}
         						    underlineStyle={{borderColor:'#37861E'}}
                                    onChange={this.handleContact.bind(this)}
                                    multiLine={true}
         						     />
        					</CardActions>
        					</Card>
        					<Divider style={{background:'#000000'}}/>


        					<Card expanded={this.state.expandedMail} style={{background:'#E5E4E2',marginTop:'0px'}}>
        					<CardActions style={{marginTop:'0px',marginLeft:'1%'}}>
							<Subheader style={{fontSize:'125%',color:'#1C6D03',marginTop:'3%'}}>Creator E-mail</Subheader>
							<Toggle
							 toggled={this.state.expandedMail}
							 onToggle={this.handleToggleMail}></Toggle>
							</CardActions>

							<CardActions expandable={true}>
         						<TextField
         						    hintText="Type Your E-mail ID Here (Optional)"
         						    hintStyle={{fontWeight:'bold'}}
         						    underlineStyle={{borderColor:'#37861E'}}
         						    onChange={this.handleEmail.bind(this)}
         						    multiLine={true}
         						     />
        					</CardActions>

        					<Divider style={{background:'#000000'}}/>

        					<CardActions >
										<Link to={url} activeClassName="active">
											<RaisedButton label="Cancel" labelStyle={{fontWeight:'bold'}} />
											</Link>
										 <Link to={url} activeClassName="active">
											<RaisedButton label="Submit" backgroundColor='#1C6D03 ' disabled={this.state.disable} onClick={this.updateDb.bind(this)} labelStyle={{color:'#FFFFFF ',fontWeight:'bold'}} />
										 </Link>
									</CardActions>
        					</Card>
					</Paper>
					</div>
	);
	}
}
export default Thankyou;
