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
import request from 'superagent';


const cardheadstyle={
background:'#242323 ',
textAlign:'center'
}
const cardTitleStyle={
  color:'#FFFFFF ',
  fontSize:'125%',
  fontWeight:'bold'
}
const buttonStye={
marginLeft:30,
}



class DateRange extends Component{
constructor(props) {
 super(props);
 this.state = {
   quest:' ',
     value: 1,
     question:""
 };
}

componentWillMount(){

  }

handleQuestion(e) {

  this.setState({
    question:e.target.value
  })



    this.props.getQuestion(e.target.value);
    this.props.type("DateRange");
  }

validateSubmit(e)
{

    this.setState({
    quest:e.target.value
  })
    this.props.getQuestion(e.target.value);
    console.log("Sucess");
  }
updateDb(){
      var sName=localStorage.getItem('sName');
  var shortQuestionScreen={
    sName:localStorage.getItem('sName'),
    type:'dateRange',
    questions:
      {
        questionType:'dateRange',
        questionQ:this.state.question,
      }

  }

  request.post('http://10.42.0.130:9080/api/updateSurvey/'+sName)

          .set('Content-Type', 'application/json')
          .send(shortQuestionScreen)
           .end((err,res)=>
           {
             console.log("posted");
            })

}
   render(){
    var url="Home/AddQuestion/"+localStorage.getItem("sName");
       return(
         <form onSubmit={this.validateSubmit.bind(this)}>
    <Paper style={{height:'100%'}} >
    <Card style={{background:'#E5E4E2 ',height:'100%'}}>
      <CardHeader title="Date Range" style={cardheadstyle} titleStyle={cardTitleStyle}/>
      <CardText style={{marginTop:0}}>
      <div>
      <Subheader style={{fontSize:'125%',color:'#1C6D03 '}}> Question Type </Subheader>
      <SelectType/>
        </div>
      </CardText>
      <Divider style={{background:'#000000 '}}/>
        <CardActions style={{marginTop:'0px',marginLeft:'1%'}}>
         <Subheader style={{fontSize:'125%',color:'#1C6D03 ',marginTop:'3%'}}>Question</Subheader>
        <TextField
          hintText="Enter your Question here."
          hintStyle={{fontWeight:'bold'}}
          underlineStyle={{borderColor:'#37861E '}}
          fullWidth={true}
          onChange={this.handleQuestion.bind(this)}

          required

        />

       </CardActions>
       <Divider style={{background:'#000000 '}}/>
      <CardActions style={{marginTop:'0px',marginLeft:'1%'}}>
      <Link to={url} activeClassName="active">
        <RaisedButton label="Cancel" labelStyle={{fontWeight:'bold'}} />
        </Link>
       <Link to={url} activeClassName="active">
        <RaisedButton label="Submit" backgroundColor='#1C6D03 ' onClick={this.updateDb.bind(this)} labelStyle={{color:'#FFFFFF ',fontWeight:'bold'}} />
       </Link>
      </CardActions>


    </Card>
    </Paper>
    </form>
       );
   }
}
export default DateRange;
