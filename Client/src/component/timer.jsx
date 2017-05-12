import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Grid,Col,Row} from 'react-flexbox-grid';
import 'react-date-picker/index.css';
import { DateField,TransitionView, Calendar } from 'react-date-picker';
import Countdown from 'react-count-down';
import $ from 'jquery';
import Request from 'superagent';

  var todayDate = new Date();
  var curDay=todayDate.getDate();
  var curMonth = todayDate.getMonth();
  var curYear = todayDate.getFullYear();

const onChange = (dateString, { dateMoment, timestamp }) => {

         var inputDate = dateString.split(/[-, ]+/);


         console.log("day"+curDay+"month"+curMonth+"year"+curYear+"inputDay"+inputDate[0]+"inputmonth"+inputDate[1]+"inputYear"+inputDate[2]);

            if(inputDate!=null && inputDate[0]<curYear)
            {
        	   alert("Select Atleast Current Year");
            }
            else if(inputDate!=null && (inputDate[0]>=curYear) && (inputDate[1]<(curMonth+1)) )
            {
                alert("Some  Problem with Month");
            }
            else if(inputDate!=null && (inputDate[0]>=curYear) && (inputDate[1]==(curMonth+1)) && (inputDate[2]<curDay) )
            {
                alert("Day should be equl or higher than current");
            }
            else
            {

            	var convertDate= new Date(dateString);
              console.log('convertDate',convertDate);



 }
 var time={endTime:convertDate,publishtime:new Date(),status:'Running'}
 Request.put('http://10.42.0.130:9080/api/updateDate/'+localStorage.getItem('sName'))
         .set('Content-Type', 'application/json')
         .send(time)
          .then((err,res)=>
          {
            console.log("posted");
          });
}

class Timer extends Component
{


 constructor(props) {
      super(props);
    this.state = {
      day:'',
      month:'',
      year:''


  }}
	render()
	{
		return(<Grid>
			<Row>
			<Col xs={12}>

                <DateField

                    dateFormat="YYYY-MM-DD hh:mm a"
                    onChange={onChange}

                >
                    <TransitionView>
                      <Calendar />
                    </TransitionView>
                </DateField>

		</Col>

		</Row>
		</Grid>);
	}
}

export default Timer;
