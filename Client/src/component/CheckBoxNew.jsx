import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import {blueGrey500} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import { Grid,Col,Row} from 'react-flexbox-grid';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import request from 'superagent';

import AddOptions from '../component/AddOptions';
 
const floatStyle={
 margin:10
}
class CheckBoxNew extends Component {

   constructor() {
    super();
   this.state = {
      quest:'',
      disable:true,
     optionArr: [' '],
        
   }
 }

 componentWillMount(){
  if (this.props.getCheckboxOptions) {
      this.props.getCheckboxOptions(this.oldOption());
      console.log(this.props.index)
    }
    this.props.type("Checkbox");
 }

 oldOption() {
    request.get('http://localhost:9080/api/getTempQuestions')

    .end((err,res) => {
      // if(res.body[i].questions[i].questionType=="MultiChoice"){
       
      //res.body.map((obj,i)=>{
        if(res.body[this.props.index].questions[this.props.index].questionType=="Checkbox")
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

  const options=this.state.optionArr.map((value,index) => {
         return (
         <AddOptions addoptions={this.addOptions.bind(this)} index={index} value={value} removeoptions={this.removeOptions.bind(this)} changeoptions={this.changeOptions.bind(this)}/>
         );
       });

  

  this.state.optionArr.map((option)=>{
     components.push(<div>
       <Checkbox label={option}  iconStyle={{marginLeft:'35%'}} labelStyle={{marginRight:'50%',color:'#000000',marginLeft:'2%'}}/>
       </div>);

     })
   return(<div>
     
      
                {components}
                {options}
   </div>);
 }
}

export default CheckBoxNew;
