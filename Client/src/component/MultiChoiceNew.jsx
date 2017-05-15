import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import {blueGrey500} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import { Grid,Col,Row} from 'react-flexbox-grid';
import Subheader from 'material-ui/Subheader';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import request from 'superagent';

import AddOptions from '../component/AddOptions';

import DisplayArea from '../component/DisplayArea';
 
const floatStyle={
 margin:10
}
var i=0;
class MultiChoiceNew extends Component {

   constructor() {
    super();
   this.state = {
      quest:'',
      disable:true,
     optionArr: [' '],
     tempArr:[],
     tempIndex:0
        
   }
 }

 componentWillMount(){

if (this.props.getMultiChoiceOptions) {
      this.props.getMultiChoiceOptions(this.oldOption());
      console.log(this.props.index)
    }
   
    this.props.type("MultiChoice");

    // if (this.props.getCheck) {
    //   // TODO: Get "weatherData" from somewhere (maybe from this.props.weather ??)
    //   this.props.getCheck(this.appCheck());
    // }
 }

  oldOption() {
    request.get('http://localhost:9080/api/getTempQuestions')

    .end((err,res) => {
      // if(res.body[i].questions[i].questionType=="MultiChoice"){
       
      //res.body.map((obj,i)=>{
        if(res.body[this.props.index].questions[this.props.index].questionType=="MultiChoice")
        {
        this.setState({
         optionArr:res.body[this.props.index].questions[this.props.index].options,
              });
        }
      //});
      
      if(err){console.log(err)}
        
    });
   
     console.log("Safe")
  }
  

 
 
questionChange(e){
  this.setState({
     quest:e.target.value,
   })
   this.props.question(e.target.value);
}
 addOptions(e)
 {
  var arr=this.state.optionArr;
  arr.push(' ');
  this.setState({optionArr:arr})
  console.log("arr"+arr);
 }

 removeOptions=(index)=>
 {
  var arr=this.state.optionArr;
  arr.splice(index,1); 
  this.setState({ optionArr:arr})
  //this.props.options(arr);
 }

  changeOptions=(index,value)=>
  {
    var arr=this.state.optionArr;
    arr[index]=value;
    this.setState({optionArr:arr})
    this.props.options(arr);
      //this.props.options(arr);
      console.log("options",arr);
      console.log("index",index,"value",value);

      
  }

  

 render()
 {
  var components=[];
  var selOpt=[];
  var updateOptions=[];
  

  const options=this.state.optionArr.map((value,index) => {

         return (
         <AddOptions addoptions={this.addOptions.bind(this)} index={index} value={value} removeoptions={this.removeOptions.bind(this)} changeoptions={this.changeOptions.bind(this)}/>
         );
       });

  this.state.optionArr.map((option)=>{
      selOpt.push(<RadioButton
      value={option}
      label={option}
      style={{width:'auto', marginRight:'20'}}
      labelStyle={ {marginLeft:'0'}}
    />);
    });
  components.push(<div><RadioButtonGroup name="MultiChoice" style={{textAlign:'left',marginLeft:'5%',marginTop:'2%'}}>
   {selOpt}
   </RadioButtonGroup>
 </div>);
   return(<div>
                {updateOptions}
                {components}
                {options}
   </div>);
 }
}

export default MultiChoiceNew;
