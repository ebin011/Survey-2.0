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

function isSelectingFirstDay(from, to, day) {
  const firstDayIsNotSelected = !from;
  const selectedDayIsBeforeFirstDay = day < from;
  const rangeIsSelected = from && to;
  return firstDayIsNotSelected || selectedDayIsBeforeFirstDay || rangeIsSelected;
}

class DateRangeNew extends Component {

   constructor() {
    super();
     this.reset = this.reset.bind(this);
    this.handleRangeClick = this.handleRangeClick.bind(this);
    this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this);

   this.state = {
      quest:'',
      from: null,
      to: null,
      enteredTo: null  
   }
 }

 componentWillMount(){
    this.props.type("DateRange");
 }
 
questionChange(e){
  this.setState({
     quest:e.target.value,
   })
   this.props.question(e.target.value);
}


  handleRangeClick(day) {
    const { from, to } = this.state;

    if (DateUtils.isSameDay(day, from)) {
      this.reset();
      return;
    }

    if (isSelectingFirstDay(from, to, day)) {
      this.setState({
        from: day,
        to: null,
        enteredTo: null,
      });
    } else {
      this.setState({
        to: day,
        enteredTo: day,
      });
    }
  }

  handleDayMouseEnter(day) {
    const { from, to } = this.state;

    if (!isSelectingFirstDay(from, to, day)) {
      this.setState({
        enteredTo: day,
      });
    }
  }

  reset() {
     this.setState({from : null,to : null,enteredTo : null}); // Keep track of the last day for mouseEnter.
  }


 
 render()
 {
     const selectedDay = moment(this.state.value, 'L', true).toDate();
     const  from = this.state.from;
     const to = this.state.to;
     const enteredTo  = this.state.enteredTo;
  var components=[];
  
  components.push(<div>
                      
                      <section >
                        { !from && !to &&
                          <p>Please select the <strong>first day</strong>.</p>
                        }
                        { from && !to &&
                          <p>Please select the <strong>last day</strong>.</p>
                        }
                        { from && to &&
                          <p>
                            You chose from <span style={{fontWeight:'bold',color:'#085db7'}}> { moment(from).format('L') }</span> to <span style={{fontWeight:'bold',color:'#085db7'}}> { moment(enteredTo).format('L') }</span>.
                            { ' ' }
                            <a onClick={ this.reset }>Reset</a>
                          </p>
                        }
                        <DayPicker
                          className="Range"
                          numberOfMonths={ 2 }
                          selectedDays={ [from, { from, to: enteredTo }] }
                          disabledDays={ { before: this.state.from } }
                          modifiers={ { start: from, end: enteredTo } }
                          onDayClick={ this.handleRangeClick }
                          onDayMouseEnter={ this.handleDayMouseEnter }
                        />
                      </section>
                  </div>);
 

    
   return(<div>
     
      
                {components}
                
   </div>);
 }
}

export default DateRangeNew;
