import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import {blueGrey500} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import { Grid,Col,Row} from 'react-flexbox-grid';
import Subheader from 'material-ui/Subheader';

import Slider from 'react-rangeslider';

 
const floatStyle={
 margin:10
}
class SliderNew extends Component {

   constructor() {
    super();
   this.state = {
      maximum:0,
      scale:0,
      quest:'',
      disable:true,
      volume: 0,
      optionArr: [' '],
          
   }
 }

 componentWillMount(){
    this.props.type("Slider");
 }
 
questionChange(e){
  this.setState({
     quest:e.target.value,
   })
   this.props.question(e.target.value);
}

handleMaxValue(e) {

  
  this.setState({
    maximum:e.target.value
  })
    this.props.getMaxValue(e.target.value);
    console.log("Sucess");
  }


handleScale(e) {
  
  this.setState({
    scale:e.target.value
  })
    this.props.getScale(e.target.value);
    console.log("Sucess");
  }


  handleSliderChange(e) {
      console.log(typeof(this.state.maximum));
       console.log("Convert"+typeof(Number(this.state.maximum))+" value "+this.state.maximum);
    if(e.target.value <= (Number(this.state.maximum)) )
    {
      this.setState({volume:e.target.value});
      this.setState({errorText:''});
    }
    else
    {
      this.setState({errorText:'Max '+this.state.maximum});
      this.setState({volume:0});
    }
  }
 

 handleOnChange = (value) => {
    this.setState({
      volume: value
    })
    console.log(value);
  }

 render()
 {
  var components=[];
  
  components.push(<div>

          <TextField
            floatingLabelText="MaxValue"
            hintText="Max Side Value"
            hintStyle={{fontWeight:'bold'}}
            required
            min='10'
            underlineStyle={{borderColor:'#37861E'}}
            onChange={this.handleMaxValue.bind(this)}
          /><br />
          <TextField
             floatingLabelText="Scale"
            hintText="Scale"
            hintStyle={{fontWeight:'bold'}}
            required
            underlineStyle={{borderColor:'#37861E'}}
            onChange={this.handleScale.bind(this)}
          /><br />

          <Slider
          min={0}
          max={this.state.maximum}
          step={this.state.scale}
          tooltip={true}
          value={this.state.volume}
          orientation="horizontal"
          onChange={this.handleOnChange}
            />


          <span style={{fontWeight:'bold'}}>Your Score : </span>
          <span style={{fontWeight:'bold'}}>
          <TextField

            value={this.state.volume}
            onChange={this.handleSliderChange.bind(this)}
            style={{width:"20%"}}
            inputStyle={{textAlign:'center'}}
            type = 'number'
            min={0} max={100}
            errorText= {this.state.errorText}
          />
          </span>
          <span style={{fontWeight:'bold',marginLeft:'2%'}}>{'/'}</span>
          <span style={{fontWeight:'bold',marginLeft:'2%'}}> {this.state.maximum}  </span>
          
                       
         </div>);
 

    
   return(<div>
     
      
                {components}
                
   </div>);
 }
}

export default SliderNew;
