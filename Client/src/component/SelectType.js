import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import {IndexLink, Link} from 'react-router';
import {blueGrey500,white} from 'material-ui/styles/colors';

import MultiChoice from 'material-ui/svg-icons/action/list';
import StarRate from 'material-ui/svg-icons/toggle/star-border';
import Comment from 'material-ui/svg-icons/communication/comment';
import DropDown from 'material-ui/svg-icons/navigation/arrow-drop-down-circle';
import Slide from 'material-ui/svg-icons/editor/linear-scale';
import CheckBox from 'material-ui/svg-icons/toggle/check-box'
import ShortText from 'material-ui/svg-icons/editor/short-text';
import Welcome from 'material-ui/svg-icons/action/input';
import Group from 'material-ui/svg-icons/action/assignment';
import True from 'material-ui/svg-icons/maps/layers-clear';
import Thank from 'material-ui/svg-icons/action/thumb-up';
import Upload from 'material-ui/svg-icons/file/file-upload';
import DatePicker from 'material-ui/svg-icons/action/today';
import DateRange from 'material-ui/svg-icons/action/date-range';
import NumberChoice from 'material-ui/svg-icons/navigation/more-horiz';

class SelectType extends Component {
  state = {
     value: null,
   };

     handleChange = (event, index, value) => {
      this.setState({value});
      console.log("Sucess"+value+" event"+event+" index"+index)
      this.props.getQuestionType(value);
        console.log("Sucess");

   };

render()
{
  return(<div>
  <SelectField
    floatingLabelText="Question Type"
    floatingLabelStyle={{textAlign:'left',color:'#FFFFFF'}}
    value={this.state.value}
    onChange={this.handleChange}
    menuStyle={{backgroundColor:'#283747'}}
    style={{paddingTop:0}}
    labelStyle={{color:'#FFFFFF'}}
    iconStyle={{color: "#9698f1"}} 
  >
     <MenuItem value={null} primaryText="" />
     <MenuItem value={1} leftIcon={<ShortText />} primaryText="Short Text" />
     <MenuItem value={2} leftIcon={<Comment />} primaryText="Comment" />
     <MenuItem value={3} leftIcon={<MultiChoice />} primaryText="Multi Choice" />
     <MenuItem value={4} leftIcon={<CheckBox />} primaryText="Check Box" />
     <MenuItem value={5} leftIcon={<DropDown />} primaryText="Drop Down" />
     <MenuItem value={6} leftIcon={<True />} primaryText="Yes / No" />
     <MenuItem value={7} leftIcon={<Slide />} primaryText="Slider" />
     <MenuItem value={8} leftIcon={<StarRate />} primaryText="Star Rating" />
     <MenuItem value={9} leftIcon={<Group />} primaryText="Question Group" />
     <MenuItem value={10} leftIcon={<DatePicker />} primaryText="Date Picker" />
     <MenuItem value={11} leftIcon={<DateRange />} primaryText="Date Range" />
     <MenuItem value={12} leftIcon={<NumberChoice />} primaryText="Number Choice" />
  
   </SelectField>
 </div>);
}
}

export default SelectType;
