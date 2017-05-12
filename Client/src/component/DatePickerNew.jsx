import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import {blueGrey500} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import { Grid,Col,Row} from 'react-flexbox-grid';

import moment from 'moment';
import DayPicker,{ DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";

 
const floatStyle={
 margin:10
}

const overlayStyle = {
  position: 'absolute',
  background: 'white',
  boxShadow: '0 2px 5px rgba(0, 0, 0, .15)',
  marginLeft:'40%',
  marginTop:'1%'

};

class DatePickerNew extends Component {

   constructor() {
    super();
     this.handleDayClick = this.handleDayClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleContainerMouseDown = this.handleContainerMouseDown.bind(this);

   this.state = {
      quest:'',
      showOverlay: false,
      value: '',
      selectedDay: null   
   }
 }

 componentWillMount(){
    this.props.type("DatePicker");
 }
 
questionChange(e){
  this.setState({
     quest:e.target.value,
   })
   this.props.question(e.target.value);
}

input = null;
  daypicker = null;
  clickedInside = false;
  clickTimeout = null;

  handleContainerMouseDown() {
    this.clickedInside = true;
    // The input's onBlur method is called from a queue right after onMouseDown event.
    // setTimeout adds another callback in the queue, but is called later than onBlur event
    this.clickTimeout = setTimeout(() => {
      this.clickedInside = false;
    }, 0);
  }

  handleInputFocus() {
    this.setState({ showOverlay: true });
  }

  handleInputBlur() {
    const showOverlay = this.clickedInside;

    this.setState({
      showOverlay,
    });

    // Force input's focus if blur event was caused by clicking on the calendar
    if (showOverlay) {
      this.input.focus();
    }
  }

  handleInputChange(e) {
    const { value } = e.target;
    const momentDay = moment(value, 'L', true);
    if (momentDay.isValid()) {
      this.setState({
        selectedDay: momentDay.toDate(),
        value,
      }, () => {
        this.daypicker.showMonth(this.state.selectedDay);
      });
    } else {
      this.setState({ value, selectedDay: null });
    }
  }


  handleDayClick(day) {
    this.setState({
      value: moment(day).format('L'),
      selectedDay: day,
      showOverlay: false,
    });
    this.input.blur();
  }
 
 render()
 {
  var components=[];
  
  components.push(<div>
                      
                      <section onMouseDown={ this.handleContainerMouseDown } style={{paddingBottom:'25%',marginTop:'3%'}} >
                        <TextField
                          type="text"
                          ref={ (el) => { this.input = el; } }
                          hintText="MM/DD/YYYY"
                          underlineStyle={{borderColor:'#37861E '}}
                          value={ this.state.value }
                          onChange={ this.handleInputChange }
                          onFocus={ this.handleInputFocus }
                          onBlur={ this.handleInputBlur }


                        />
                        { this.state.showOverlay &&
                          <section style={ { position: 'relative' } }>
                            <section style={ overlayStyle }>
                              <DayPicker
                                ref={ (el) => { this.daypicker = el; } }
                                initialMonth={ this.state.selectedDay || undefined }
                                onDayClick={ this.handleDayClick }
                                selectedDays={ this.state.selectedDay }
                              />
                            </section>
                          </section>
                        }
                      </section>
                  </div>);
 

    
   return(<div>
     
      
                {components}
                
   </div>);
 }
}

export default DatePickerNew;
