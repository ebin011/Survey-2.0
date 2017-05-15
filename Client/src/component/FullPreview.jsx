import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { Grid,Col,Row} from 'react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import request from 'superagent';
import ActionInfo from 'material-ui/svg-icons/navigation/close';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import {IndexLink, Link} from 'react-router';
import ReactStars from 'react-stars';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


import moment from 'moment';
import DayPicker,{ DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";

 var val=0;
 var starComment='';
 var starValue=0;

var starArray=[];
var arr=[];
const welcomeStyle={
background:'#649F4E',
textAlign:'center',
height:'20%'
}
const questionStyle={
background:'#FFFFFF',
textAlign:'center',
marginTop:'10%',
marginBottom:'10%',
marginLeft:0,
marginRight:0,
height:'25%'
}
var starColor='#ffd700';
var starChange=0;
const thanksStyle={
background:'#649F4E',
textAlign:'center',
marginTop:'1%',
height:'35%'
}

const style = {
textAlign: 'center',
height:'80%',
width:'100%',
};

const iconStyles = {
  textAlign:'left',
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


class Dropabble  extends Component {

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
        userName:'',
        userId:'',
        userRole:'',
        output:[],
        sliderChange:0,
        starRating: .5,
        dropDown:'null',
        singleTextValue:'',
        commentValue:[],
        checkboxValue:[],
        multiChoiceValue:[],
        yesOrNoValue:'',
        sliderValue:'',
        i:0,
        starval:0,

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

  componentWillMount() {

    var sName=this.props.params.sName;
      request
      .get('http://10.201.174.176:9080/api/getSurvey/'+sName)
      .end((err,res) => {
        this.setState({
          output:res.body
        });
      console.log("next",res.body.welcomeMsg);
      // console.log("quest",res.body.questions[1].questionQ);
      });
    }

update(quest,i){
  var a=this.state.commentValue;
  a[i]={"type":"question","quest":quest,"answer":starChange};
  console.log("starChange"+a);
  this.setState({commentValue:a});

}
  valueChanged=(quest,i,newRating) =>  {
    starChange=newRating;
    starColor='#ffd700';
    var a=this.state.commentValue;
    a[i]={"type":"question","quest":quest,"answer":starChange};
    console.log("starChange"+a);
    this.setState({commentValue:a});

    starArray.push({"type":"question","quest":quest,"answer":newRating,"index":i})
    newRating=starChange;
    this.setState({starval:newRating});
      console.log("comment value set",starArray)

  }
  dropValueChanged=(quest,i,e,opt,newValue) =>  {
    var a=this.state.commentValue;
    a[i]={"type":"question","quest":quest,"answer":newValue};
    this.setState({dropDown:newValue,commentValue:a});
      console.log("comment value set",this.state.commentValue)
      console.log(i,quest,newValue);
  }
  singleTextValueChanged=(i,quest,e,newValue) =>  {
    var a=this.state.commentValue;
    a[i]={"type":"question","quest":quest,"answer":newValue};
    this.setState({singleTextValue:newValue,commentValue:a});
      console.log("comment value set",this.state.commentValue)
    console.log("singletext value set", newValue)
  }
  userNameChanged(e,data){
    this.setState({userName:data});
  }
  idChanged(e,data){
    console.log(data);
      this.setState({userId:data});
  }
  roleChanged(e,data){
      this.setState({userRole:data});
    console.log(data);
  }

  commentsValueChanged=(quest,i,e,newValue) =>  {
  var a=this.state.commentValue;
  a[i]={"type":"question","quest":quest,"answer":newValue};
    // this.state.commentValue.push(newValue);
    this.setState({commentValue:a});
    console.log("comment value set",this.state.commentValue)
  }
  multiChoiceValueChange=(quest,i,e,value)=>{
    var a=this.state.commentValue;
    var b=this.state.multiChoiceValue;
    b[i]=value;
    a[i]={"type":"question","quest":quest,"answer":value};
    this.setState({multiChoiceValue:b,commentValue:a});
      console.log("comment value set",this.state.commentValue)
    console.log("multiChoiceValue",value,quest,i);
  }
  yesOrNoValueChange=(quest,i,e,value)=>{
    var a=this.state.commentValue;
    a[i]={"type":"question","quest":quest,"answer":value};
    this.setState({yesOrNoValue:value,commentValue:a});
      console.log("comment value set",this.state.commentValue)
    console.log("yesOrNoValue",value);
  }
  checkboxValueChange=(value,quest,index,ansindex,e,status) =>  {
    var ans=this.state.commentValue;
    var a=this.state.checkboxValue;
    console.log("index value set", value)
    if(status){
    a.push(value)
    this.setState({checkboxValue:a});
    console.log("checkbox value set",value,quest,index,ansindex,e,status)}

    else
    {
      var x= a.indexOf(value)
      a.splice(x,1);
    this.setState({checkboxValue:a});
    console.log("checkbox value unsetset", a)}
    ans[index]={"type":"question","quest":quest,"answer":a};
    this.setState({commentValue:ans});
    console.log("comment value set",this.state.commentValue)
  }
  saveData = () => {
  var a=this.state.commentValue;
  var ans=this.state.commentValue;
  a[ans.length]={"type":"userDetails","name":this.state.userName,"id":this.state.userId,"role":this.state.userRole};
  this.setState({commentValue:a});
if(starArray.length!=0){
  for(let i=0;i<starArray.length;i++){
    var a=this.state.commentValue;
    a[starArray[i].index]={"type":"question","quest":starArray[i].quest,"answer":starArray[i].answer};
    console.log("starChange"+a);
    this.setState({commentValue:a});
    console.log(starArray[i].index,starArray[i].quest,starArray[i].answer);
  }

}
    var sName1=this.props.params.sName;
        var options=this.state.commentValue;
        //options.push(this.state.commentValue);
console.log("lenth",options.length,options);
        var data1={};
          data1={surveyName:sName1,options:this.state.commentValue}
          request.post('http://10.201.174.176:9080/api/fullAnswers/'+sName1)
                  .set('Content-Type', 'application/json')
                  .send(options)
                   .end(function(err,res)
                   {
                     if(err){
                       console.log("err",err);
                     }
                     if(res){
                       console.log("posted",res);
                     }

                   });
  }

  handleSlider = (event, value) => {
    this.setState({sliderChange:value});
    console.log("sliderChange",value);
  };
  handleSliderChange=()=>{

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

  handleDayClick(quest,index,day) {
    console.log("SDf",day,quest,index);
    var a=this.state.commentValue;
    a[index]={"type":"question","quest":quest,"answer":day};
    this.setState({
      value: moment(day).format('L'),
      selectedDay: day,
      showOverlay: false,
      commentValue:a
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
handleContainerMouseDown() {
  this.clickedInside = true;
  // The input's onBlur method is called from a queue right after onMouseDown event.
  // setTimeout adds another callback in the queue, but is called later than onBlur event
  this.clickTimeout = setTimeout(() => {
    this.clickedInside = false;
  }, 0);
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
handleRangeClick(quest,index,day) {
  console.log(quest,index,day);

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
  var a=this.state.commentValue;
  a[index]={"type":"question","quest":quest,"answer":[moment(this.state.from).format('L'),moment(this.state.enteredTo).format('L')]};
  this.setState({
    commentValue:a
  });
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
 render() {
   const selectedDay = moment(this.state.value, 'L', true).toDate();
   const  from = this.state.from;
   const to = this.state.to;
   const enteredTo  = this.state.enteredTo;
   var welcomeTitle=[];
   var thanksMessage=[];
   var questions=[];

       if(this.state.output.welcomeMsg)
       {
         console.log("state", this.state.output.welcomeMsg);
         welcomeTitle.pop();
         welcomeTitle.push(<div>
         <h3 style={{marginTop:'2%',marginBottom:'2%',color:'#FFFFFF',fontSize:'150%'}}>{this.state.output.welcomeMsg}</h3>
          <Divider/>
         <h4 style={{marginTop:'1%',marginLeft:'1%',color:'#DAF7A6  ',textAlign:'left'}}>{this.state.output.description}</h4>
         <Col xsOffset={6} xs={6}>
         <Row>
         <h3>Your Name : </h3>
         <TextField
           hintText="Your Name Here"
           hintStyle={{fontWeight:'bold'}}
           underlineStyle={{borderColor:'#37861E '}}
           onChange={this.userNameChanged.bind(this)}
           />
           </Row>
           <Row>
         <h3>Emp ID : </h3>
          <TextField
           hintText="Your Emp ID Here"
           hintStyle={{fontWeight:'bold'}}
           underlineStyle={{borderColor:'#37861E '}}
           onChange={this.idChanged.bind(this)}
           />
           </Row>
           <Row>
         <h3>Your Current role : </h3>
          <TextField
           hintText="Your Role Here"
           hintStyle={{fontWeight:'bold'}}
           underlineStyle={{borderColor:'#37861E '}}
           onChange={this.roleChanged.bind(this)}
           />
         </Row>
         </Col>
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
           <h4 style={{marginTop:0,marginLeft:'1%',color:'#283747',textAlign:'left'}}>{this.state.output.creterEmail} </h4>
                 </div>);
       }
       if(this.state.output.questions)
       {

         questions.pop();
         questions.push(this.state.output.questions.map((obj,i)=>{
           if(obj.questionType=="Comments"){
             return(<Card>
               <CardText>
               <h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{i+1}.{obj.questionQ}</h3>
               </CardText>
               <CardText>
               <TextField
               hintText="Your Option Here"
               hintStyle={{fontWeight:'bold'}}
               underlineStyle={{borderColor:'#37861E '}}
               onChange={this.commentsValueChanged.bind(this,obj.questionQ,i)}
               />
               </CardText>
             </Card>);
           }
           if(obj.questionType=="dateRange"){
             return(<Card>
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
                onDayClick={ this.handleRangeClick.bind(this,obj.questionQ,i) }
                onDayMouseEnter={ this.handleDayMouseEnter }
              />
            </section>
             </CardText>
             </Card>);
           }
           if(obj.questionType=="datePicker"){
             return(<Card>
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
                       onDayClick={ this.handleDayClick.bind(this,obj.questionQ,i) }
                       selectedDays={ this.state.selectedDay }
                     />
                   </section>
                 </section>
               }
             </section>
             </CardText>
             </Card>);
           }
           else if(obj.questionType=="Checkbox"){
              var options=[];
               obj.options.map((option,j)=>{
               options.push(<div>
                  <Checkbox label={option} onCheck={this.checkboxValueChange.bind(this,option,obj.questionQ,i,j)} iconStyle={{marginLeft:'35%'}} labelStyle={{marginRight:'50%',color:'#000000',marginLeft:'2%'}}/>
                  </div>);

                });

              return(<Card expanded='false'>
                <CardText>
              <h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{i+1}.{obj.questionQ} </h3>
              </CardText>
              <CardText>
              {options}
              </CardText>
              </Card>);
}
else if(obj.questionType=="Dropdown"){
   var options=[];
    obj.options.map((option)=>{
    options.push(
         <MenuItem value={option} primaryText={option} iconStyle={{marginLeft:'35%'}}/>
       );


     });

   return(<Card expanded='false'>

     <CardText>
   <h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{i+1}.{obj.questionQ} </h3>
   </CardText>
   <CardText>
   <DropDownMenu onChange={this.dropValueChanged.bind(this,obj.questionQ,i)} value={this.state.dropDown} labelStyle={{marginRight:'50%',color:'#000000',marginLeft:'2%'}}>
   {options}
   </DropDownMenu>
   </CardText>
   </Card>);
}
else if(obj.questionType=="StarRatings"){
   var options=[];
    options.push(
      <ReactStars
       count={obj.options.length}
       onChange={this.valueChanged.bind(this,obj.questionQ,i)}
       value={this.state.starval}
       size={35}
       color2={starColor}
       />
     );

   return(<Card expanded='false'>

     <CardText>
   <h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{i+1}.{obj.questionQ} </h3>
   </CardText>
   <CardText>
   {options}
   </CardText>
   </Card>);
}
else if(obj.questionType=="SingleText"){

   return(<Card expanded='false'>

     <CardText>
   <h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{i+1}.{obj.questionQ} </h3>
   </CardText>
   <CardText>
   <TextField
   hintText="Your Answer Here"
   hintStyle={{fontWeight:'bold'}}
   underlineStyle={{borderColor:'#37861E '}}
   onChange={this.commentsValueChanged.bind(this,obj.questionQ,i)}
   />
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
   <h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{i+1}.{obj.questionQ} </h3>
   </CardText>
   <CardText>
   <RadioButtonGroup onChange={this.multiChoiceValueChange.bind(this,obj.questionQ,i)} name="YesOrNo" style={{textAlign:'left',marginLeft:'5%',marginTop:'2%'}} >
   {options}
   </RadioButtonGroup>
   </CardText>
   </Card>);
}
else if(obj.questionType=="Slider"){
  arr=this.state.dataChange;
   return(<Card expanded='false'>

     <CardText>
   <h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000 ',textAlign:'left'}}>{i+1}.{obj.questionQ} </h3>
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
   <h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{i+1}.{obj.questionQ} </h3>
   </CardText>
   <CardText>
   <RadioButtonGroup name="YesOrNo" onChange={this.yesOrNoValueChange.bind(this,obj.questionQ,i)}style={{textAlign:'left',marginLeft:'5%',marginTop:'2%'}} >

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
      <h2 style={{fontWeight:'bold',textAlign:'center'}}>Your Template</h2>
      <Paper  style={style}>
        <Card style={welcomeStyle}>
          {welcomeTitle}
          </Card>

        {questions}

        <Card style={thanksStyle}>
            {thanksMessage}
        </Card>
        <RaisedButton
          label={'Finish'}
          primary={true}
          onTouchTap={this.saveData}

        />
      </Paper>
    </div>
  );
 }
}

export default Dropabble;
