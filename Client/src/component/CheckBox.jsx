import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AddOptions from '../component/AddOptions';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {IndexLink, Link} from 'react-router';
import Divider from 'material-ui/Divider';
import { Grid,Col,Row} from 'react-flexbox-grid';
import {blueGrey500,white} from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import SelectType from './SelectType';
import request from 'superagent';
const textStyle={
marginRight:130
}

class CheckBox extends Component {
 constructor() {
   	super();
   this.state = {
     quest:' ',
     disable:true,
     optionArr: [' '],
		 value: 1
   }
 }
 componentWillMount(){
     this.props.type("Checkbox");

 }
handleChange = (event, index, value) => this.setState({value});
 addOptions(e)
 {
   if(this.state.quest.length<5||this.state.optionArr.length<1)
   {
     this.setState({
       disable:true
     })
   }
   else {
     this.setState({
       disable:false
     })
   }
  var arr=this.state.optionArr;
  arr.push(' ');
  this.setState({
    optionArr:arr
  });
 }
 removeOptions=(index)=>
 {
   if(this.state.quest.length<5||this.state.optionArr.length<1)
   {
     this.setState({
       disable:true
     })
   }
   else {
     this.setState({
       disable:false
     })
   }
   var arr=this.state.optionArr;
   if(arr.length>1)
  {
      arr.splice(index,1);
      this.setState({
        optionArr:arr
      });
      this.props.options(arr);
    }
 }
changeOptions=(index,value)=>
{
  var arr=this.state.optionArr;
  arr[index]=value;
  this.setState({
  optionArr:arr
});
  this.props.options(arr);
}
questionChange(e)
{
  if(e.target.value.length<5||this.state.optionArr.length<2)
  {
    this.setState({
      disable:true
    })
  }
  else {
    this.setState({
      disable:false
    })
  }
  this.setState({
    quest:e.target.value
  })
  this.props.question(e.target.value);

}
updateDb(){
  var sName=localStorage.getItem('sName');
  var questionScreen={
    sName:localStorage.getItem('sName'),
    type:'checkbox',
    questions:
      {
        questionType:'Checkbox',
        questionQ:this.state.quest,
        options:this.state.optionArr
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
 render() {
   var url="Home/AddQuestion/"+localStorage.getItem("sName");
   const options=this.state.optionArr.map((value,index) => {
     return (
     <AddOptions addoptions={this.addOptions.bind(this)} index={index} value={value} removeoptions={this.removeOptions.bind(this)} changeoptions={this.changeOptions.bind(this)}/>
     );
   });
   return (
                <Paper>
                <Card  style={{background:"#E5E4E2"}}>
                <CardHeader
                  title="Checkbox" style={{background:"#242323",}} titleStyle={{fontWeight:'bold',color:'#FFFFFF',marginLeft:'20%'}}
                />
                <CardText >
                <Subheader style={{fontSize:'125%',color:'#1C6D03 '}}>Select the question type</Subheader>
                <SelectType/>
	              <br /><br />
                <Subheader style={{fontSize:'125%',color:'#1C6D03 '}}>Enter the question</Subheader>
                 <TextField
                value={this.state.quest}
                underlineStyle={{borderColor:blueGrey500}}
                onChange={this.questionChange.bind(this)}
                style={textStyle}
                />
                <br /><br />
                <Divider style={{background:blueGrey500}}/>
                <Subheader style={{fontSize:'125%',color:'#1C6D03 '}}>Add answer options</Subheader>
                {options}
                <br />
                </CardText>
                  <Divider style={{background:blueGrey500}}/>
                <CardActions>

  	           <Link to={url} activeClassName="active">
  	             <RaisedButton label="Cancel" labelStyle={{fontWeight:'bold'}} />
  	           </Link>
               <Link to={url} activeClassName="active">
                 <RaisedButton label="Submit" backgroundColor='#1C6D03' disabled={this.state.disable} onClick={this.updateDb.bind(this)} labelStyle={{color:'#FFFFFF ',fontWeight:'bold'}}/>
          </Link>
              </CardActions>
               </Card>
               </Paper>



   );
 }
}

export default CheckBox;
