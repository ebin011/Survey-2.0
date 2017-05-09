import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {IndexLink, Link} from 'react-router';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import SelectType from './SelectType';

import { Grid,Row,Col } from 'react-flexbox-grid'

import request from 'superagent';


const cardheadstyle={
 background:'#242323',
 textAlign:'center'
}
const cardTitleStyle={
   color:'#FFFFFF',
   fontSize:'125%',
   fontWeight:'bold'
}
const buttonStye={
 marginLeft:30,
}
class Comments extends Component{
 constructor(props) {
  super(props);
  this.state = {value: 5,
  quest:' ',disable:true};
}

componentWillMount(){
    this.props.type("Comments");
  }

handleQuestion(e) {
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
  this.setState({
    quest:e.target.value
  })
    this.props.getQuestion(e.target.value);
    console.log("Sucess");
  }

  updateDb(){
        var sName=localStorage.getItem('sName');
    var questionScreen={
        sName:localStorage.getItem('sName'),
        type:'comments',
      questions:
        {
          questionType:'Comments',
          questionQ:this.state.quest,
        }

    }
    request.post('http://10.201.174.176:9080/api/updateSurvey/'+sName)
            .set('Content-Type', 'application/json')
            .send(questionScreen)
             .end((err,res)=>
             {
               console.log("posted");
              })
  }
handleChange = (event, index, value) => this.setState({value});
    render(){
      var url="Home/AddQuestion/"+localStorage.getItem("sName");
        return(<Paper >
     <Card style={{background:'#E5E4E2'}}>

       <CardHeader title="Comments" style={cardheadstyle} titleStyle={cardTitleStyle}/>
      <Row>
       <CardText style={{marginTop:0}}>
       <Col xs={12}>
       <Subheader style={{fontSize:'125%',color:'#1C6D03 '}}> Question Type </Subheader>


        <SelectType/>
         </Col>

       </CardText>
       </Row>
       <Divider style={{background:'#000000'}}/>
       <Row>
         <CardActions style={{marginTop:'0px',marginLeft:'1%'}}>
         <Col xs={12}>
          <Subheader style={{fontSize:'125%',color:'#1C6D03 ',marginTop:'3%'}}>Question</Subheader>
         </Col>
         <Col xs={12}>
         <TextField
           hintText="Enter your Question here."
           hintStyle={{fontWeight:'bold'}}
           underlineStyle={{borderColor:'#37861E'}}
           fullWidth={true}
           onChange={this.handleQuestion.bind(this)}
         />
         </Col>
        </CardActions>
        </Row>
        <Divider style={{background:'#000000'}}/>
       <CardActions style={{marginTop:'0px',marginLeft:'1%'}}>
       <Link to={url} activeClassName="active">
         <RaisedButton label="Cancel" labelStyle={{fontWeight:'bold'}} />
         </Link>
        <Link to={url} activeClassName="active">
         <RaisedButton label="Submit" backgroundColor='#1C6D03' disabled={this.state.disable} onClick={this.updateDb.bind(this)} labelStyle={{color:'#FFFFFF ',fontWeight:'bold'}} />
        </Link>
       </CardActions>

     </Card>
     </Paper>
        );
    }
}
export default Comments;
