import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { Grid,Col,Row} from 'react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import request from 'superagent';


import CloseButton from 'material-ui/svg-icons/navigation/close';
import DuplicateButton from 'material-ui/svg-icons/content/content-copy';
import EditButton from 'material-ui/svg-icons/image/edit';

import {IndexLink, Link} from 'react-router';

import ReactStars from 'react-stars';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import moment from 'moment';
import DayPicker,{ DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";

var arr;
const welcomeStyle={
background:'#649F4E',
textAlign:'center',
height:'20%',
marginBottom:'5%'
}
const overlayStyle = {
  position: 'absolute',
  background: 'white',
  boxShadow: '0 2px 5px rgba(0, 0, 0, .15)',

};
const questionStyle={
background:'#FFFFFF',
textAlign:'center',
marginTop:'10%',
marginBottom:'10%',
marginLeft:0,
marginRight:0,
height:'25%'
}

const thanksStyle={
background:'#649F4E',
textAlign:'center',
marginTop:'1%',
height:'35%'
}

const style = {
textAlign: 'center',
marginBottom:'2%',
width:'100%',
};

const iconStyles = {
 textAlign:'left',
};
const ratingChanged = (newRating) => {
  console.log(newRating)
}
function isSelectingFirstDay(from, to, day) {
  const firstDayIsNotSelected = !from;
  const selectedDayIsBeforeFirstDay = day < from;
  const rangeIsSelected = from && to;
  return firstDayIsNotSelected || selectedDayIsBeforeFirstDay || rangeIsSelected;
}
class Dropabble  extends Component {
  constructor() {
     super();
     this.handleDayClick = this.handleDayClick.bind(this);
     this.handleInputChange = this.handleInputChange.bind(this);
     this.handleInputFocus = this.handleInputFocus.bind(this);
     this.handleInputBlur = this.handleInputBlur.bind(this);
     this.handleContainerMouseDown = this.handleContainerMouseDown.bind(this);

     this.reset = this.reset.bind(this);
     this.handleRangeClick = this.handleRangeClick.bind(this);
     this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this);

    this.state = {
       output:[],
       sliderChange:0,
       starRating: 1,
       starComment:'',
       volume: 0,
       open:false,
       dataChange:[]

    }
  }

  componentWillMount() {

    var sName=localStorage.getItem('sName');
      request
      .get('http://10.42.0.130:9080/api/getSurvey/'+sName)
      .end((err,res) => {
        this.setState({
          output:res.body
        });
      console.log("next",res.body.welcomeMsg);
      // console.log("quest",res.body.questions[1].questionQ);
      });
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
handleChange(i)
{
  var sName=localStorage.getItem('sName');
    request
    .put('http://10.42.0.130:9080/api/deleteQuest/'+sName+'/'+i)
    .end((err,res) => {

    console.log("next");
    // console.log("quest",res.body.questions[1].questionQ);
    });
window.location.reload()
 }
 handleClose = () => {
   this.setState({open: false});
 };
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
   console.log("from",moment(this.state.from).format('L'),"to",moment(this.state.enteredTo).format('L'));
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
  updateUserSchema(){
    var qstn=[];

    this.setState({
      open:true
    })
    var data={
      surveyname:localStorage.getItem('sName'),
      status:'draft',
      questions:qstn
      }
      this.state.output.questions.map((obj,i)=>{
        if(obj.questionType=='Slider'){
          qstn.push({question:obj.questionQ,
            questiontype:obj.questionType,
           maxValue:obj.maxValue,
            count:[]})
        }
        else{
          qstn.push({question:obj.questionQ,
            questiontype:obj.questionType,
            options:obj.options,
            count:[]})
              console.log("options",obj.options);
              }
        })

     request.post('http://10.42.0.130:9080/api/addResult')
            .set('Content-Type', 'application/json')
            .send(data)
             .then((err,res)=>
             {
               console.log("posted");
              })

  }

  valueChanged=(newValue) =>  {

    for(let i=0;i<this.props.putOptions.length;i++)
    {
      this.setState({starComment:this.props.putOptions[newValue-1]});
    }

    this.setState({starRating:newValue});
    console.log(newValue)
  }


  handleOnChange (i,value,event){
   var a=this.state.dataChange;
   a[i]=value
    this.setState({
      volume: value,
      dataChange:a

    })
    console.log(value);
    console.log(this.state.dataChange);
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
  handleSliderChange(i,value,e) {
      console.log(typeof(value));
      var a=this.state.dataChange;
      a[i]=value
        console.log(this.state.dataChange);
       console.log("Convert"+typeof(Number(value))+" value "+value);
    if(e.target.value <= (Number(value)) )
    {
      this.setState({volume:e.target.value,dataChange:a});
      this.setState({errorText:''});
    }
    else
    {
      this.setState({errorText:'Max '+value});
      this.setState({volume:0});
    }
  }
  handleContainerMouseDown() {
    this.clickedInside = true;
    // The input's onBlur method is called from a queue right after onMouseDown event.
    // setTimeout adds another callback in the queue, but is called later than onBlur event
    this.clickTimeout = setTimeout(() => {
      this.clickedInside = false;
    }, 0);
  }
render() {
  const selectedDay = moment(this.state.value, 'L', true).toDate();
  const  from = this.state.from;
  const to = this.state.to;
  const enteredTo  = this.state.enteredTo;
   var welcomeTitle=[];
   var thanksMessage=[];
   var questions=[];
   welcomeTitle.push(
  <Col xs={12}>
      <h3 style={{marginTop:'2%',marginBottom:'2%',fontSize:'150%',paddingTop:10}}> Survey Title</h3>
      <Divider/>
      <h4 style={{marginTop:'1%',marginLeft:'1%',color:'#283747',textAlign:'left'}}>Description </h4>

</Col>
    );
    questions.push(
        <h3 style={{marginTop:'5%',marginBottom:'5%',color:'#818181',height:'50%'}}>Your Questions </h3>
      );
    thanksMessage.push(
<Col xs={12}>
       <h3 style={{marginTop:'2%',marginBottom:'2%'}}> Thank You Message</h3>
       <Divider/>
       <h4 style={{marginTop:'1%',marginLeft:'1%',color:'',textAlign:'left',color:'#283747'}}> Creater Name </h4>
       <h4 style={{marginTop:0,marginLeft:'1%',color:'#283747',textAlign:'left'}}>Creater Contact Number </h4>
       <h4 style={{marginTop:0,marginLeft:'1%',color:'#283747',textAlign:'left'}}> Creater E-mail </h4>
</Col>
      );
      if(this.state.output.welcomeMsg)
      {
        console.log("state", this.state.output.welcomeMsg);
        welcomeTitle.pop();
        welcomeTitle.push(<div>
        <h3 style={{marginTop:'2%',marginBottom:'2%',paddingTop:10,color:'#FFFFFF',fontSize:'150%'}}>{this.state.output.welcomeMsg}</h3>
         <Divider/>
        <h4 style={{marginTop:'1%',marginLeft:'1%',color:'#DAF7A6',textAlign:'left'}}>{this.state.output.description}</h4>
       </div>);
      }
      if(this.state.output.thanksMessage)
      {
        console.log("state", this.state.output.welcomeMsg);
        thanksMessage.pop();
        thanksMessage.push(<div>
          <h3 style={{marginTop:'2%',marginBottom:'2%'}}>{this.state.output.thanksMessage}</h3>
          <Divider/>
          <h4 style={{marginTop:'1%',marginLeft:'1%',color:'',textAlign:'left',color:'#283747'}}>{this.state.output.createrName}</h4>
          <h4 style={{marginTop:0,marginLeft:'1%',color:'#283747',textAlign:'left'}}>{this.state.output.createrContact}</h4>
          <h4 style={{marginTop:0,marginLeft:'1%',color:'#283747',textAlign:'left'}}>{this.state.output.createrEmail} </h4>
                </div>);
      }
      if(this.state.output.questions)
      {

        questions.pop();
        questions.push(this.state.output.questions.map((obj,i)=>{
          if(obj.questionType==="Comments"){
            return(<Card>
              <CardText>
                  <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <DuplicateButton style={iconStyles}/>
                  </IconButton>
                  <IconButton tooltip="Edit Question" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                        <EditButton style={iconStyles}/>
                  </IconButton>
                  <IconButton onTouchTap={this.handleChange.bind(this,obj.questionQ)} tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                        <CloseButton style={iconStyles}/>
                  </IconButton>
              </CardText>
              <CardText>
              <h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{i+1}.{obj.questionQ}</h3>
              </CardText>
              <CardText>
              <TextField
              hintText="Your Option Here"
              hintStyle={{fontWeight:'bold'}}
              underlineStyle={{borderColor:'#37861E '}}
              />
              </CardText>
            </Card>);
          }
          else if(obj.questionType=="Checkbox"){
             var options=[];
              obj.options.map((option)=>{
              options.push(<div>
                 <Checkbox label={option}  iconStyle={{marginLeft:'35%'}} labelStyle={{marginRight:'50%',color:'#000000',marginLeft:'2%'}}/>
                 </div>);

               });

             return(<Card expanded='false'>
               <CardText>
                  <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                       <DuplicateButton style={iconStyles}/>
                  </IconButton>
                  <IconButton tooltip="Edit Question" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                        <EditButton style={iconStyles}/>
                  </IconButton>
                  <IconButton onTouchTap={this.handleChange.bind(this,obj.questionQ)} tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                        <CloseButton style={iconStyles}/>
                  </IconButton>
               </CardText>
               <CardText>
             <h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{i+1}.{obj.questionQ} </h3>
             </CardText>
             <CardText>
             {options}
             </CardText>
             </Card>);
}
else if(obj.questionType=="dateRange"){
  //  var options=[];
  //   obj.options.map((option)=>{
  //   options.push(<div>
  //      <Checkbox label={option}  iconStyle={{marginLeft:'35%'}} labelStyle={{marginRight:'50%',color:'#000000',marginLeft:'2%'}}/>
  //      </div>);
   //
  //    });

   return(<Card expanded='false'>
     <CardText>
        <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
             <DuplicateButton style={iconStyles}/>
        </IconButton>
        <IconButton tooltip="Edit Question" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
              <EditButton style={iconStyles}/>
        </IconButton>
        <IconButton onTouchTap={this.handleChange.bind(this,obj.questionQ)} tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
              <CloseButton style={iconStyles}/>
        </IconButton>
     </CardText>
     <CardText>
   <h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{i+1}.{obj.questionQ} </h3>
   </CardText>
   <CardText>
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
   </CardText>
   </Card>);
}
else if(obj.questionType=="datePicker"){
  //  var options=[];
  //   obj.options.map((option)=>{
  //   options.push(<div>
  //      <Checkbox label={option}  iconStyle={{marginLeft:'35%'}} labelStyle={{marginRight:'50%',color:'#000000',marginLeft:'2%'}}/>
  //      </div>);
   //
  //    });

   return(<Card expanded='false'>
     <CardText>
        <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
             <DuplicateButton style={iconStyles}/>
        </IconButton>
        <IconButton tooltip="Edit Question" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
              <EditButton style={iconStyles}/>
        </IconButton>
        <IconButton onTouchTap={this.handleChange.bind(this,obj.questionQ)} tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
              <CloseButton style={iconStyles}/>
        </IconButton>
     </CardText>
     <CardText>
   <h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{i+1}.{obj.questionQ} </h3>
   </CardText>
   <CardText>
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
   </CardText>
   </Card>);
}
else if(obj.questionType==="Dropdown"){
  var options=[];
   var index=1;
    options.push(<MenuItem value={index} primaryText="Select an option"/>)
    obj.options.map((option)=>{index++;
       options.push(<MenuItem value={index} primaryText={option}/>);
    })

  return(<Card expanded='false'>
    <CardText>
      <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
             <DuplicateButton style={iconStyles}/>
      </IconButton>
      <IconButton tooltip="Edit Question" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
             <EditButton style={iconStyles}/>
      </IconButton>
      <IconButton onTouchTap={this.handleChange.bind(this,obj.questionQ)} tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
             <CloseButton style={iconStyles}/>
      </IconButton>
    </CardText>
    <CardText>
  <h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{i+1}.{obj.questionQ} </h3>
  </CardText>
  <CardText>
  <SelectField value={1}>{options}</SelectField>
  </CardText>
  </Card>);
}
else if(obj.questionType=="StarRatings" ){
  var options=[];
  arr=this.state.dataChange;
   options.push(
     // <StarRating
     //  size={obj.options.length}
     //  value={this.state.starRating}
     //  onChange={this.valueChanged.bind(this)}
     //  />

      <ReactStars
        count={obj.options.length}
        onChange={ratingChanged}
        size={35}
        value={4}
        color2={'#ffd700'} />
          );

  return(<Card expanded='false'>
    <CardText>
          <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                <DuplicateButton style={iconStyles}/>
          </IconButton>
          <IconButton tooltip="Edit Question" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                <EditButton style={iconStyles}/>
          </IconButton>
          <IconButton onTouchTap={this.handleChange.bind(this,obj.questionQ)} tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                <CloseButton style={iconStyles}/>
          </IconButton>
    </CardText>
    <CardText>
  <h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{i+1}.{obj.questionQ} </h3>
  </CardText>
  <CardText>
  {options}
  </CardText>
  </Card>);
}
else if(obj.questionType=="SingleText"){
  var options=[];
   obj.options.map((option)=>{
   options.push(<div>
      <Checkbox label={option}  iconStyle={{marginLeft:'35%'}} labelStyle={{marginRight:'50%',color:'#000000',marginLeft:'2%'}}/>
      </div>);

    });

  return(<Card expanded='false'>
    <CardText>

        <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                <DuplicateButton style={iconStyles}/>
        </IconButton>
        <IconButton tooltip="Edit Question" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                <EditButton style={iconStyles}/>
        </IconButton>
        <IconButton onTouchTap={this.handleChange.bind(this,obj.questionQ)} tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                <CloseButton style={iconStyles}/>
        </IconButton>
    </CardText>
    <CardText>
  <h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{i+1}.{obj.questionQ} </h3>
  </CardText>
  <CardText>
  {options}
  </CardText>
  </Card>);
}
else if(obj.questionType=="MultiChoice"){
  var options=[];
   obj.options.map((option)=>{
   options.push(
     <RadioButton
     value={option}
     label={option}
     iconStyle={{marginLeft:'35%'}}
     labelStyle={ {marginLeft:'0'}}/>);

    });

  return(<Card expanded='false'>
    <CardText>
          <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                <DuplicateButton style={iconStyles}/>
          </IconButton>
          <IconButton tooltip="Edit Question" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                  <EditButton style={iconStyles}/>
          </IconButton>
          <IconButton onTouchTap={this.handleChange.bind(this,obj.questionQ)} tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                  <CloseButton style={iconStyles}/>
          </IconButton>
    </CardText>
    <CardText>
  <h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{i+1}.{obj.questionQ} </h3>
  </CardText>
  <CardText>
  <RadioButtonGroup name="YesOrNo" style={{textAlign:'left',marginLeft:'5%',marginTop:'2%'}} >
  {options}
  </RadioButtonGroup>
  </CardText>
  </Card>);
}
else if(obj.questionType=="Slider"){

arr=this.state.dataChange;
  return(<Card expanded='false'>
    <CardText>

          <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                <DuplicateButton style={iconStyles}/>
          </IconButton>
          <IconButton tooltip="Edit Question" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                <EditButton style={iconStyles}/>
          </IconButton>
          <IconButton onTouchTap={this.handleChange.bind(this,obj.questionQ)} tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                <CloseButton style={iconStyles}/>
          </IconButton>

    </CardText>
    <CardText>
  <h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{i+1}.{obj.questionQ} </h3>
  </CardText>
  <CardText>


    <Slider

          min={0}
          max={obj.maxValue}
          step={obj.scale}
          tooltip={true}
          value={arr[i]}
          orientation="horizontal"
          onChange={this.handleOnChange.bind(this,i)}
            />



          <span style={{fontWeight:'bold'}}>Your Score : </span>
          <span style={{fontWeight:'bold'}}>
          <TextField
            ref="slider"
            value={arr[i]}
            onChange={this.handleSliderChange.bind(this,i,obj.maxValue)}
            style={{width:"20%"}}
            inputStyle={{textAlign:'center'}}
            type = 'number'
            min={0} max={100}
            errorText= {this.state.errorText}
          />
          </span>
          <span style={{fontWeight:'bold',marginLeft:'2%'}}>{'/'}</span>
          <span style={{fontWeight:'bold',marginLeft:'2%'}}>
                {obj.maxValue}
          </span>




  </CardText>
  </Card>);
}
else if(obj.questionType=="YesOrNo"){


  return(<Card expanded='false'>
    <CardText>
        <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                <DuplicateButton style={iconStyles}/>
        </IconButton>
        <IconButton tooltip="Edit Question" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                <EditButton style={iconStyles}/>
        </IconButton>
        <IconButton onTouchTap={this.handleChange.bind(this,obj.questionQ)} tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                <CloseButton style={iconStyles}/>
        </IconButton>
    </CardText>
    <CardText>
  <h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{i+1}.{obj.questionQ} </h3>
  </CardText>
  <CardText>
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
  </CardText>
  </Card>);
}


     }
 ));
      }

  return(
    <div style={{height:'90%'}}>
     <Paper  style={style}>
       <Card style={welcomeStyle}>
        <CardText style={{background:'#649F4E'}}>
         {welcomeTitle}
         </CardText>
         </Card>
       {questions}
       <Link to='Home/CreateSurvey' activeClassName="active">
       <RaisedButton label="Submit" onClick={this.updateUserSchema.bind(this)} backgroundColor='#1C6D03' style={{marginTop:10}} labelStyle={{color:'#FFFFFF ',fontWeight:'bold'}} />
       </Link>
       <Card style={thanksStyle}>
       <CardText style={{background:'#649F4E'}}>
           {thanksMessage}
           </CardText>
       </Card>
       <Dialog
        title="Your Survey is saved successfully"
        subtitle=""
        modal={false}
        contentStyle={{width:'60%'}}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        <Row  middle="xs">
      <Col xs={12}>
      <Row>
      To publish the survey go to 'Drafts' and publish it
      </Row>
      <Row>

      <Col xsOffset={1}  xs={1}>
        <Link to='Home/CreateSurvey' activeClassName="active">
          <RaisedButton label="Start" backgroundColor="#1C6D03" labelColor='white' labelStyle={{fontWeight:'bold'}} />
        </Link>
      </Col>
        </Row>

        </Col>

      </Row>
      </Dialog>
     </Paper>
   </div>
 );
}
}

export default Dropabble;
