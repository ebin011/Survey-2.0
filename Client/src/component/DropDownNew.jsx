import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import {blueGrey500} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import { Grid,Col,Row} from 'react-flexbox-grid';
import Subheader from 'material-ui/Subheader';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import AddOptions from '../component/AddOptions';
 
const floatStyle={
 margin:10
}
class DropDownNew extends Component {

   constructor() {
    super();
   this.state = {
      quest:'',
      disable:true,
     optionArr: [' '],
        
   }
 }

 componentWillMount(){
    this.props.type("Dropdown");
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
  var index=1;

  const options=this.state.optionArr.map((value,index) => {
         return (
         <AddOptions addoptions={this.addOptions.bind(this)} index={index} value={value} removeoptions={this.removeOptions.bind(this)} changeoptions={this.changeOptions.bind(this)}/>
         );
       });

  components.push(<div>
                      <TextField
                              hintText="Your Question"
                              hintStyle={{fontWeight:'bold'}}
                              value={this.state.quest}
                              multiLine={true}
                              underlineStyle={{borderColor:'#37861E '}}
                              style={{marginTop:0,marginLeft:'2%',width:'80%',marginBottom:0,color:'#000000',textAlign:'left'}}
                              onChange={this.questionChange.bind(this)}
                      />
                  </div>);

        this.state.optionArr.map((option)=>{index++;
          selOpt.push(<MenuItem value={index} primaryText={option}/>);
       });
       components.push(<SelectField value={1} floatingLabelText="Select your option">{selOpt}</SelectField>);
 

    
   return(<div>
     
      
                {components}
                {options}
   </div>);
 }
}

export default DropDownNew;
