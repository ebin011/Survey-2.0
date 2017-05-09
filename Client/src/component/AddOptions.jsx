import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import {blueGrey500} from 'material-ui/styles/colors';
 
const floatStyle={
 margin:10
}
class AddOptions extends Component {
 addClicked(e)
 {
   this.props.addoptions(this.props.index,e);
 }
 removeClicked(e)
 {
   this.props.removeoptions(this.props.index);
 }
 changeOptions(e)
 {
 this.props.changeoptions(this.props.index,e.target.value);
 }
 render()
 {
   return(<div>
     <TextField floatingLabelText="Add options" value={this.props.value} onChange={this.changeOptions.bind(this)} underlineStyle={{borderColor:blueGrey500}} floatingLabelStyle={{color:blueGrey500}}/>
     <FloatingActionButton mini={true} style={floatStyle} backgroundColor="green" onClick={this.addClicked.bind(this)}>
     <ContentAdd />
   </FloatingActionButton>
   <FloatingActionButton mini={true} style={floatStyle} backgroundColor="red" onClick={this.removeClicked.bind(this)}>
   <ContentRemove />
 </FloatingActionButton>
   </div>);
 }
}

export default AddOptions;
