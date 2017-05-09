import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import { Tooltip } from 'reactstrap';
import { Grid,Row,Col } from 'react-flexbox-grid';

import StarRating from 'react-star-rating'

import ReactStars from 'react-stars';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

import moment from 'moment';
import DayPicker,{ DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";

 var val=0;
 var starComment='';
 var starValue=0;


const welcomeStyle={
background:'#2F3A30',
textAlign:'center',
height:"5%",
margin:'auto'
}

const questionStyle={
background:'#FFFFFF',
textAlign:'center',
marginTop:0,
marginBottom:0,
height:'80%'
}

const thanksStyle={
background:'#2F3A30',
textAlign:'center',
height:"7%"

}

const style = {
textAlign: 'center',
width:'100%',
};

const overlayStyle = {
  position: 'absolute',
  background: 'white',
  boxShadow: '0 2px 5px rgba(0, 0, 0, .15)',

};

const initialState = {
  from: null,
  to: null,
  enteredTo: null, // Keep track of the last day for mouseEnter.
};

function isSelectingFirstDay(from, to, day) {
  const firstDayIsNotSelected = !from;
  const selectedDayIsBeforeFirstDay = day < from;
  const rangeIsSelected = from && to;
  return firstDayIsNotSelected || selectedDayIsBeforeFirstDay || rangeIsSelected;
}


class TempDisplay  extends Component {

constructor(){
  super();

    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleContainerMouseDown = this.handleContainerMouseDown.bind(this);

    this.reset = this.reset.bind(this);
    this.handleRangeClick = this.handleRangeClick.bind(this);
    this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this);

  this.state={
    checked:'',
    showYes:false,
    sliderChange: 0,

    starVal: 0,
    starComment:'',
    starColor:'#ffd700',

    starNum:0,
    volume: 0,
    errorText: '',
    scoreCheck:0,

    showOverlay: false,
    value: '',
    selectedDay: null,

    from: null,
    to: null,
    enteredTo: null, // Keep track of the last day for mouseEnter.

  };
}




   componentWillReceiveProps(newProps)  {

      this.setState({scoreCheck:newProps.putMaxValue});
      // console.log(newProps.putScale);
   }
   componentWillUnmount() {
    clearTimeout(this.clickTimeout);
  }


handleOptionChangeYes (e) {
  this.setState({showYes:e.target.value})
}

handleSlider = (event, value) => {
  console.log("inside handle slider"+event,value);
  this.setState({sliderChange: value});
};

valueChanged = (event) =>  {
  this.setState({starRating:event});
  console.log(event)
}


  valueChanged = (newValue) =>  {
    this.setState({starRating:newValue});



  }




 handleOnChange = (value) => {
    this.setState({
      volume: value
    })
    console.log(value);
  }
handleSliderChange(e) {
      console.log(typeof(this.props.putMaxValue));
       console.log("Convert"+typeof(Number(this.props.putMaxValue))+" value "+this.props.putMaxValue);
    if(e.target.value <= (Number(this.props.putMaxValue)) )
    {
      this.setState({volume:e.target.value});
      this.setState({errorText:''});
    }
    else
    {
      this.setState({errorText:'Max '+this.props.putMaxValue});
      this.setState({volume:0});
    }
  }
updateStar = (value) =>{
  console.log("got Here"+value)
}

ratingChanged = (newRating) => {
  console.log(newRating)
  starValue = newRating;
  this.setState({starVal:newRating})
  console.log("starRating"+starValue);

  if(((newRating/(this.props.putOptions.length))*100)<=20){
    this.setState({starColor:'#cb4335',starComment:'Bad' })

  }
  else if(((newRating/(this.props.putOptions.length))*100)>20 && ((newRating/(this.props.putOptions.length))*100)<=40 ){
    this.setState({starColor:'#e67e22',starComment:'Not Bad'})
  }
  else if(((newRating/(this.props.putOptions.length))*100)>40 && ((newRating/(this.props.putOptions.length))*100)<=60 ){
    this.setState({starColor:'#f1c40f',starComment:'Average'})
  }
  else if(((newRating/(this.props.putOptions.length))*100)>60 && ((newRating/(this.props.putOptions.length))*100)<=80 ){
    this.setState({starColor:'#28b463',starComment:'Very Good'})
  }
  else if(((newRating/(this.props.putOptions.length))*100)>80 && ((newRating/(this.props.putOptions.length))*100)<=100 ){
    this.setState({starColor:' #229954',starComment:'Excellent'})
  }

}

//Date Picker

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
    this.setState({
      showOverlay: true,
    });
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
    console.log("day",day);
  }
  //date RAnge
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

 render() {
     const selectedDay = moment(this.state.value, 'L', true).toDate();
     const  from = this.state.from;
     const to = this.state.to;
     const enteredTo  = this.state.enteredTo;
   var dispQuest =[];
   var yesComments=[];
   if(this.props.putComments){
     yesComments.push(<div style={{marginLeft:'5%'}}>
       {this.props.putComments}
       <br />
       <TextField
       hintText="Your Option Here"
       hintStyle={{fontWeight:'bold'}}
       underlineStyle={{borderColor:'#37861E '}}
       />
     </div>);
   }
   var yesOptions=[];
   if(this.props.putYesOrNo){
     yesOptions.push(<div style={{marginLeft:'5%'}}>
       {this.props.putYesOrNo}
       <RadioButtonGroup name="YesOrNo" style={{textAlign:'left',marginLeft:'5%',marginTop:'2%'}} >

               <RadioButton
               value="Yes"
               label="Yes"
             />

             <RadioButton
               value="No"
               label="No"
             />

       </RadioButtonGroup>
     </div>);
   }
   var noComments=[];
   if(this.props.putComments1){
     noComments.push(<div>
       {this.props.putComments1}
       <TextField
       hintText="Your Option Here"
       hintStyle={{fontWeight:'bold'}}
       underlineStyle={{borderColor:'#37861E '}}
       style={{marginLeft:'5%'}}
       />
     </div>);
   }
   var noOptions=[];
   if(this.props.putYesOrNo1){
     noOptions.push(<div>
       {this.props.putYesOrNo1}
       <RadioButtonGroup name="YesOrNo" style={{textAlign:'left',marginLeft:'5%'}} >

               <RadioButton
               value="Yes"
               label="Yes"
             />

             <RadioButton
               value="No"
               label="No"
             />

       </RadioButtonGroup>
     </div>);
   }
   if(this.state.showYes=='Yes')
     {
       console.log("test");
     dispQuest.push(<div>
     {yesComments}
     {yesOptions}

     </div>);
     }
     else if(this.state.showYes=='No'){
        dispQuest.push(<div>
       {noComments}
       {noOptions}
        </div>);
     }





    var welcome=[];
   var components=[];
   var thanks=[];
   var options=[];
   var selOpt=[];



     components.push(
      <Row>
      <Col xs={12}>
            <h3 style={{marginTop:'10%',marginBottom:'10%',color:'#818181'}}>[Question comes here]</h3>
      </Col>
      </Row>
      );


   welcome.push(
    <Row>
      <Col xs={12}>
        <h3 style={{marginTop:'2%',marginBottom:'2%',color:'#FFFFFF',fontSize:'150%'}}> [Title comes Here]</h3>
          <Divider/>
      </Col>

     </Row>
     );
   thanks.push(
    <Row>
        <Col xs={12}>
          <h3 style={{marginTop:'2%',marginBottom:'2%',color:'#FFFFFF'}}> [Thank You Mesage comes Here]</h3>
            <Divider/>
        </Col>

     </Row>
   );


   if(this.props.putWelMsg && this.props.putType=="Welcome")
   {
     welcome.pop();
     welcome.push(<div>
     <h3 style={{marginTop:'2%',marginBottom:'2%',color:'#FFFFFF',fontSize:'150%'}}>{this.props.putWelMsg}</h3>
      <Divider/>
     <h4 style={{marginTop:'1%',marginLeft:'1%',color:'#DAF7A6  ',textAlign:'left'}}>{this.props.putWelDes}</h4>
    </div>);
   }


   else if(this.props.putQuestion&&this.props.putType==="Checkbox"){
       components.pop();
       components.push(<div>
      <h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{this.props.putQuestion}</h3>
      </div>);
    this.props.putOptions.map((option)=>{
     components.push(<div>
       <Checkbox label={option}  iconStyle={{marginLeft:'35%'}} labelStyle={{marginRight:'50%',color:'#000000',marginLeft:'2%'}}/>
       </div>);

     })
   }
   else if(this.props.putQuestion && this.props.putType=="Textbox"){
       components.pop();
       components.push(<Col xs={12}>
      <h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{this.props.putQuestion}</h3>
      <TextField
      hintText="Your Option Here"
      hintStyle={{fontWeight:'bold'}}
      underlineStyle={{borderColor:'#37861E '}}
      />
    </Col>);

   }

   else if(this.props.putQuestion && this.props.putType=="StarRatings" )

  {


      components.pop();



      components.push( <Col xs={12} >

     <h3 style={{marginTop:'10%',marginBottom:'5%',marginLeft:'2%',color:'#000000 ',textAlign:'left'}}>{this.props.putQuestion}</h3>
                   </Col> ) ;


      if(this.props.putOptions.length)
      {

              val=val+1;
            console.log("here val"+val);
              if(val>=2)
                {
                  components.pop();
                  val=0;


      components.push( <Col xs={12} >

     <h3 style={{marginTop:'10%',marginBottom:'5%',marginLeft:'2%',color:'#000000 ',textAlign:'left'}}>{this.props.putQuestion}</h3>

                  <Col xs={8}>
                      <ReactStars
                          count={this.props.putOptions.length}
                          onChange={this.ratingChanged}
                          value={this.state.starVal}
                          size={35}
                          color2={this.state.starColor}


                            />
                    </Col>

                    <Col xs={4}>
                            <span style={{fontWeight:'bold',textAlign:'left',fontSize:'125%'}}>{this.state.starComment}</span>
                    </Col>
                 </Col> );


                }
                else{
                  components.push( <Col xs={12} >
                    <Col xs={8}>
                      <ReactStars
                          count={this.props.putOptions.length}
                          onChange={this.ratingChanged}
                          value={this.state.starVal}
                          size={35}
                          color2={this.state.starColor}

                            />
                    </Col>
                    <Col xs={4}>
                            <span style={{fontWeight:'bold',textAlign:'left',fontSize:'125%'}}>{this.state.starComment}</span>
                    </Col>

                 </Col> );

                }


      }

  }


   else if (this.props.putQuestion && this.props.putType=="Dropdown") {

       components.pop();
       components.push(<Col xs={12}>

      <h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{this.props.putQuestion}</h3>
      </Col>);

       var index=1;
       selOpt.push(<MenuItem value={index} primaryText="Select an option"/>)
       this.props.putOptions.map((option)=>{index++;
          selOpt.push(<MenuItem value={index} primaryText={option}/>);
       })
       components.push(<SelectField value={1}>{selOpt}</SelectField>);

   }
    else if(this.props.putQuestion && this.props.putType=="Comments"){

       components.pop();

       components.push(

        <Row>

      <h3 style={{marginTop:'10%',marginBottom:'10%',marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{this.props.putQuestion}</h3>

      <Col xs={12}>
      <TextField

      hintText="Your Comments Here"
      hintStyle={{fontWeight:'bold'}}
      underlineStyle={{borderColor:'#37861E '}}
      fullWidth={true}
      style={{marginBottom:'10%'}}
      />

      </Col>


      </Row>
    );
   }



   else if(this.props.putQuestion && this.props.putType=="YesOrNo"){
       components.pop();
       components.push(<div>
      <h3 style={{marginTop:'3%',marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{this.props.putQuestion}</h3>
      <RadioButtonGroup name="YesOrNo" style={{textAlign:'left',marginLeft:'5%',marginTop:'2%'}} >

        <RadioButton
        value="Yes"
        label="Yes"
        labelStyle={{fontWeight:'bold'}}
      />

      <RadioButton
        value="No"
        label="No"
        labelStyle={{fontWeight:'bold'}}
      />
      </RadioButtonGroup>
    </div>);

   }

else if(this.props.putQuestion && this.props.putType=="DatePicker"){
       components.pop();
       components.push(<Col xs={12}>
      <h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{this.props.putQuestion}</h3>
      <section onMouseDown={ this.handleContainerMouseDown } style={{paddingBottom:'70%'}} >
        <input
          type="text"
          ref={ (el) => { this.input = el; } }
          placeholder="DD/MM/YYYY"
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
    </Col>);

   }

   else if(this.props.putQuestion && this.props.putType=="DateRange"){
       components.pop();
       components.push(<Col xs={12}>
      <h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{this.props.putQuestion}</h3>
      <section >
        { !from && !to &&
          <p>Please select the <strong>first day</strong>.</p>
        }
        { from && !to &&
          <p>Please select the <strong>last day</strong>.</p>
        }
        { from && to &&
          <p>
            You chose from { moment(from).format('L') } to { moment(enteredTo).format('L') }.
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
    </Col>);

   }



  else if (this.props.putOptions && this.props.putQuestion && this.props.putType=="MultiChoice") {

       components.pop();
       components.push(<div>
      <h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{this.props.putQuestion}</h3>
      </div>);

    this.props.putOptions.map((option)=>{
      selOpt.push(<RadioButton
      value={option}
      label={option}
      style={{width:'auto', marginRight:'20'}}
      labelStyle={ {marginLeft:'0'}}
    />);
  });
  components.push(<div><RadioButtonGroup name="MultiChoice" style={{ display: 'flex', textAlign:'left'}}>
   {selOpt}
   </RadioButtonGroup>
 </div>);
  }


   else if(this.props.putQuestion && this.props.putType=="Slider"){
       components.pop();
       components.push(<Col xs={12}>
      <h3 style={{marginTop:'3%',marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{this.props.putQuestion}</h3>


      <Slider
          min={0}
          max={this.props.putMaxValue}
          step={this.props.putScaleValue}
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
          <span style={{fontWeight:'bold',marginLeft:'2%'}}>
                {this.props.putMaxValue}
          </span>

               </Col>);

   }

  else if(this.props.putThanks && this.props.putType=="Thanks")
   {
    thanks.pop();
    thanks.push(<div>
     <h3 style={{marginTop:'2%',marginBottom:'2%',color:'#FFFFFF'}}>{this.props.putThanks}</h3>
      <Divider/>
     <h4 style={{marginTop:'1%',marginLeft:'1%',color:'#DAF7A6  ',textAlign:'left'}}>{this.props.putName}</h4>
     <h4 style={{marginTop:0,marginLeft:'1%',color:'#DAF7A6  ',textAlign:'left'}}>Contact Number:{this.props.putContact} </h4>
     <h4 style={{marginTop:0,marginLeft:'1%',color:'#DAF7A6  ',textAlign:'left'}}>E-mail ID:{this.props.putEmail}</h4>
     </div>);
  }
   else if(this.props.putQuestion && this.props.putType=="Qgroup"){
       components.pop();
       components.push(<div>
      <h3 style={{marginTop:'3%',marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{this.props.putQuestion}</h3>

      <RadioButtonGroup name="YesOrNo" style={{textAlign:'left',marginLeft:'5%',marginTop:'2%'}} onChange={this.handleOptionChangeYes.bind(this)}>

      <RadioButton
      value="Yes"
      label="Yes"

    />

    <RadioButton
      value="No"
      label="No"

    />

      </RadioButtonGroup>
      <div style={{textAlign:'left',marginTop:'2%'}}>{dispQuest}</div>



    </div>);
   }
   else if (this.props.putType=="MultiChoice") {
     this.props.putOptions.map((option)=>{
       selOpt.push(<RadioButton
       value={option}
       label={option}
       style={{width:'auto', marginRight:'20'}}
       labelStyle={ {marginLeft:'0'}}
     />);
   });
   components.push(<div><RadioButtonGroup name="MultiChoice" style={{ display: 'flex', textAlign:'left'}}>
    {selOpt}
    </RadioButtonGroup>
  </div>);
   }

   return(


      <Paper  style={style}>
        <Card style={welcomeStyle}>
          {welcome}
        </Card>

        <Card style={questionStyle}>
        {components}
        </Card>

        <Card style={thanksStyle}>
          {thanks}
        </Card>
      </Paper>


  );
 }

}
export default TempDisplay;
