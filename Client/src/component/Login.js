import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {IndexLink, Link} from 'react-router';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import Forward from 'material-ui/svg-icons/content/forward';
import UserName from 'material-ui/svg-icons/action/account-box';
import PasswordIcon from 'material-ui/svg-icons/action/lock';
import ImageResponsive, {Source} from 'react-image-responsive';

import survey from '../../images/survey.jpg';
import Background from '../../images/Final.png';
import { Grid,Col,Row} from 'react-flexbox-grid';

import '../App.css';

const style = {
  textAlign: 'center',
  display: 'inline-block',
  marginTop:'5%',
 marginBottom:'9%',
 marginLeft:'30%',

 width:'40%',
 height:'40%'
};
const cardheadstyle={
  background:'#242323',
  textAlign:'center'

};
const cardTitleStyle={
   color:'#FFFFFF',
   fontSize:'125%',
   fontWeight:'bold'
};
const buttonStye={
  color:'white',
}


class Login extends Component{
	render(){

		return(
     
      <Grid>
         
    
         
      <Row middle="xs">
       <Col xs={12}>
       <Row center="xs">
       <h2 style={{fontSize:'350%',fontFamily:'Black Ops One',color:'#FDFEFE'}}>Start Survey</h2>
       </Row>
       <Row center="xs">
       <Col xs={8}>
     <form 
     style={{borderStyle:'solid',borderRadius:25,borderWidth:2,borderColor:'#212F3D', background:'#34495E', opacity: 0.5}}>
     
     <Col xs={12}>
      <h2 style={{color:'#FDFEFE'}}>LOGIN</h2>
      </Col>
     
      <Row >
      
      <Col xsOffset={4} >
         <Avatar
          icon= {<UserName/>}
          backgroundColor={'#566573'}
          style={{marginTop:'2%'}}
         />
         
         </Col>
          <Col xs={1}>
          <TextField
            hintText="Enter your Emp-ID"
           hintStyle={{fontWeight:'bold',color:'#FDFEFE '}} 
           underlineStyle={{borderColor:'#F4F6F7'}}
           style={{marginTop:'2%',marginLeft:'5%'}}
           
          />
          </Col>
          </Row>
          <Row>
         <Col xsOffset={4}>
         <Avatar
          icon= {<PasswordIcon/>}
          backgroundColor={'#566573'}
          style={{marginTop:'2%'}}
         />
         
         </Col>
         <Col xs={1}>
          <TextField
           hintText="Enter your Password"
           hintStyle={{fontWeight:'bold',color:'#FDFEFE '}} 
           underlineStyle={{borderColor:'#F4F6F7'}}
            style={{marginLeft:'5%'}}
          />
          </Col>
         </Row> 
         <Row center="xs">
         <Col xs="3">

          <Link to="Home/CreateSurvey" activeClassName="active">
             <RaisedButton 
                  label="Login"
                  backgroundColor="#2ECC71" 
                  style={{marginTop:'3%',marginBottom:'3%'}}  
                  labelStyle={{color:'#FFFFFF ',fontWeight:'bold'}}  
                  icon={< Forward />} />
          </Link>

          </Col>
          </Row>

        </form>
        </Col>
        </Row>
      </Col>
      </Row>
     
		</Grid>
    );

	}
 }
 export default Login;
