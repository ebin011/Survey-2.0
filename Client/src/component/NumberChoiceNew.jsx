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
import ReactStars from 'react-stars';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

var val=0;

const floatStyle={
 margin:10
}
class NumberChoiceNew extends Component {

   constructor() {
    super();
   this.state = {

      quest:"",
      disable:true,
      value: 0,
      listOptions:[],
      addValue: false,
      starValues:[],
      defaultValue:[],

     choice:[],
        
   }
 }

 componentWillMount(){
    this.props.type("NumberChoice");
 }
 
questionChange(e){

  this.setState({quest:e.target.value })

   this.props.question(e.target.value);
}


 handleChange = (event, index, value) => {


   
   this.setState({value:value })
   this.props.scale(value);
  }
 

 

 render()
 {
  var components=[];
  var selOpt=[];
  var index=1;
  const items = [];
  const choice = [];

  for (let i = 3; i <= 8; i++ ) {

      items.push(<MenuItem value={i} key={i} primaryText={`${i}`} />);
    }
   
  

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
            <SelectField
                  floatingLabelText="Select Scale"
                  hintText="Number of stars"
                  value={this.state.value}
                  onChange={this.handleChange.bind(this)}
                  maxHeight={200}
                  underlineStyle={{borderColor:blueGrey500}} required>
                  {items}
            </SelectField>
                  </div>);

  for(let i=1;i<=this.state.value;i++){
      selOpt.push(<RadioButton
      value={i}
      label={i}
      style={{marginLeft:0,marginRight:0,width:'10%'}}
      inputStyle={{marginLeft:'20%'}}
      labelStyle={ {marginLeft:'5%',marginRight:'20%'}}
      iconStyle={{marginLeft:'10%',marginRight:'2%'}}
    />);
    }
  components.push(<div><RadioButtonGroup name="MultiChoice" style={{textAlign:'left',marginTop:'2%',marginLeft:'10%',display:"flex",width:'100%'}} >
   {selOpt}
   </RadioButtonGroup>
 </div>);

      

    
   return(<div>
     
      
                {components}
                
   </div>);
 }
}

export default NumberChoiceNew;
