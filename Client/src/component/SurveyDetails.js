import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {IndexLink, Link} from 'react-router';
import { Grid,Col,Row} from 'react-flexbox-grid';

import request from 'superagent';
const style = {
  textAlign: 'center',
  display: 'inline-block',
  marginLeft:'30%',
  marginTop:'10%',
  width:'40%',
  height:'50%',
};
const cardheadstyle={
  background:'black',
  textAlign:'center',
}
const buttonStye={
  marginLeft:30,
}


class SurveyDetails extends Component{
  constructor(props) {
    	super(props);
    this.state = {
      name:''
    }
  }
  createDb(){
     localStorage.setItem("sName", this.state.name);
    console.log("name set Sucess", this.state.name);
    console.log(localStorage.getItem('sName'));
    var nameData={
      surveyname:this.state.name
    }


    request.post('http://10.201.174.176:9080/api/createSurvey')

            .set('Content-Type', 'application/json')
            .send(nameData)
             .end((err,res)=>
             {
              if(err){
               console.log("faild posted");
              }
              })

  }
  nameChange(e)
  {
    this.setState({
      name:e.target.value
    })
  }
	render(){
		return(<Grid>
        <Row  middle="xs">

         <Col xs={12}>

          <TextField
            hintText="Name of the survey"
            onChange={this.nameChange.bind(this)}
          /><br />

          <Link to="Home/AddQuestion" activeClassName="active">
            <RaisedButton label="Start" onClick={this.createDb.bind(this)} backgroundColor="#004D40" labelColor='white'/>
          </Link>
          <Link to="Home/CreateSurvey" activeClassName="active">
            <RaisedButton label="Cancel" style={buttonStye}/>

          </Link>
        </Col>
          </Row>


		</Grid>);
	}
 }
 export default SurveyDetails;
