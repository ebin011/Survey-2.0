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

    request.get('http://localhost:9080/api/getTempQuestions')

    .end((err,res) => {
      // if(res.body[i].questions[i].questionType=="MultiChoice"){
       
      res.body.map((obj,i)=>{
        if(obj.questions[i].questionType=="MultiChoice")
        {
        this.setState({
         optionArr:res.body[i].questions[i].options,
              });
        }
      });
      
      if(err){console.log(err)}
        
    });
   

    this.props.type("MultiChoice");
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
  
  onOptionChange(){
    console.log("get it");
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
