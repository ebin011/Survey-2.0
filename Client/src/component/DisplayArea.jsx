import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import {blueGrey500} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import { Grid,Col,Row} from 'react-flexbox-grid';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import request from 'superagent';

import CloseButton from 'material-ui/svg-icons/navigation/close';
import DuplicateButton from 'material-ui/svg-icons/content/content-copy';

import Textarea from 'react-textarea-autosize';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import ReactStars from 'react-stars';
import moment from 'moment';
import DayPicker,{ DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";

import NewTemplate from './newTemplate'
import SelectType from './SelectType';
import AddOptions from '../component/AddOptions';
import MultiChoice from '../component/MultiChoiceNew';
import CheckBox from '../component/CheckBoxNew';
import DropDown from '../component/DropDownNew';
import YesOrNo from '../component/YesOrNoNew';
import SliderComponent from '../component/SliderNew';
import StarRate from '../component/StarNew';
import SingleText from '../component/SingleTextNew';
import CommentText from '../component/CommentTextNew';
import DatePicker from '../component/DatePickerNew';
import DateRange from '../component/DateRangeNew';
import NumberChoice from '../component/NumberChoiceNew';



var val=0;
var tempArray=[];
var sName="surveytempquestions";
var tempValue;


const floatStyle={
 margin:10
}

const iconStyles = {
 textAlign:'left',
};

const overlayStyle = {
  position: 'absolute',
  background: 'white',
  boxShadow: '0 2px 5px rgba(0, 0, 0, .15)',
  marginLeft:'40%',
  marginTop:'1%',


};
function isSelectingFirstDay(from, to, day) {
  const firstDayIsNotSelected = !from;
  const selectedDayIsBeforeFirstDay = day < from;
  const rangeIsSelected = from && to;
  return firstDayIsNotSelected || selectedDayIsBeforeFirstDay || rangeIsSelected;
}
class DisplayArea extends Component {

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

      questionArray:[],
      output:[],

      dataChange:[],
      errorText: '',

      starVal: 0,
      starComment:'',
      starColor:'#ffd700',

      questionSelection:[],
      questionsShadow:[],
      avilableType:["SingleText","CommentText","MultiChoice","Checkbox","Dropdown","YesOrNo","Slider","StarRating","QuestionGroup","DatePicker","DateRange","NumberChoice"],

      questType:'',
      type:'',
      questionQuest:'',
      optionsArr:[],
      optionsEdit:[],

      oldOptions:"get it"
        
   }
 }
 setoldOption(checkIndex) {
    this.setState({ oldOptions: checkIndex });
    
    console.log("checkClass"+checkIndex)
  }
 questionsFunction(fullArray)
  {
    this.setState({  questionArray:fullArray })
    console.log("Got Here");
    //console.log(fullArray)
  }
   addNewQuestionDisplay() {
    //e.preventDefault();
    console.log("got it");
    console.log(this.props);
  }

  
 componentWillMount(){
    request.get('http://localhost:9080/api/getTempQuestions')

    .end((err,res) => {
      this.setState({
        output:res.body
      });
      console.log("result",res.body);
      if(err){console.log(err)}
    });

    //var fillFalse=this.state.questionSelection;
    // fillFalse.fill(false);
    // this.setState({questionSelection:fillFalse});

    var fillShadow=this.state.questionsShadow;
    fillShadow.fill(0);
    this.setState({questionsShadow:fillShadow});
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
 
 handleSliderChange(i,Maxvalue,e) {
     
      var a=this.state.dataChange;
      a[i]=e.target.value
        console.log(this.state.dataChange);
       console.log("Convert"+typeof(Number(Maxvalue))+" value "+Maxvalue);
       console.log("val"+e.target.value)
    if(e.target.value <= Maxvalue )
    {
      this.setState({volume:e.target.value,dataChange:a});
      this.setState({errorText:''});
    }
    else
    {
       this.setState({errorText:'Max '+Maxvalue});
       this.setState({volume:0});
     }
  }

  ratingChanged(starLength,newRating){
  console.log(newRating)
  console.log("length"+starLength);
  this.setState({starVal:newRating})

  if(((newRating/(starLength))*100)<=20){
    this.setState({starColor:'#cb4335',starComment:'Bad' })

  }
  else if(((newRating/(starLength))*100)>20 && ((newRating/(starLength))*100)<=40 ){
    this.setState({starColor:'#e67e22',starComment:'Not Bad'})
  }
  else if(((newRating/(starLength))*100)>40 && ((newRating/(starLength))*100)<=60 ){
    this.setState({starColor:'#f1c40f',starComment:'Average'})
  }
  else if(((newRating/(starLength))*100)>60 && ((newRating/(starLength))*100)<=80 ){
    this.setState({starColor:'#28b463',starComment:'Very Good'})
  }
  else if(((newRating/(starLength))*100)>80 && ((newRating/(starLength))*100)<=100 ){
    this.setState({starColor:' #229954',starComment:'Excellent'})
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
handleContainerMouseDown() {
    this.clickedInside = true;
    // The input's onBlur method is called from a queue right after onMouseDown event.
    // setTimeout adds another callback in the queue, but is called later than onBlur event
    this.clickTimeout = setTimeout(() => {
      this.clickedInside = false;
    }, 0);
  }

  reset() {
    this.setState({from : null,to : null,enteredTo : null}); // Keep track of the last day for mouseEnter.
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

 onChangeQuestType(quest){
  
    var temp=this.state.avilableType;
    console.log("selected type"+temp[quest-1]);
    this.setState({ questType:temp[quest-1]})

}
questionQuestChange(e){
  this.setState({
     questionQuest:e.target.value,
   })
   
}
 getType(type)
  {
    this.setState({ type:type })
  }
test(value){console.log("parent")}
onChangeOptions(options)
  {
    this.setState({ optionsArr:options })
  }  
  /*Slider*/
  onChangeMax(maxValue)
  {
    this.setState({ maxValue:maxValue });

  }
   onChangeScale(scaleValue)
  {
    this.setState({ scaleValue:scaleValue });

  }
  /*Star Rating*/
  onChangeStarScale(value)
  {
    this.setState({scale:value})
  }
  /*Number Choice*/
 onChangeNumberScale(value)
 {
  this.setState({numberScale:value})
 }
 onMouseOverQuestion(number,questionObject,editingTemplete)  {
  //this.setState({questionsShadow[number]: 3,questionSelection[number]:true});
  console.log("clicked"+number)
  console.log(questionObject.questions[number].questionQ)
  var tempOptions=this.state.optionsEdit;
      tempOptions=questionObject.questions[number].options;
  var makeTrue=this.state.questionSelection;
  makeTrue=[];
      makeTrue.fill(false,0,editingTemplete[0].length);
      makeTrue[number]=({selection:true,"questionNumber":number,"questionQ":questionObject.questions[number].questionQ,"questionType":questionObject.questions[number].questionType});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    this.setState({questionSelection:makeTrue,questType:questionObject.questions[number].questionType,questionQuest:questionObject.questions[number].questionQ,optionsEdit:tempOptions});
 

    console.log(makeTrue);
    var fillShadow=this.state.questionsShadow;
    fillShadow.splice(number,0,3);
    this.setState({questionsShadow:fillShadow});

    
    console.log(questionObject);
    
}
 render()
 {
   const selectedDay = moment(this.state.value, 'L', true).toDate();
   const  from = this.state.from;
   const to = this.state.to;
   const enteredTo  = this.state.enteredTo;

   var finalTemplete=[];
   const { values } = this.props;



      if(this.state.output!=null)
      {
        
      finalTemplete.push(this.state.output.map((obj,i)=>{
        //console.log("Full Data");
        //console.log(obj.questions[i].questionType)
        //console.log(obj.questions[i].questionQ)
       if(obj.questions[i].questionType=='SingleText')
         {
        return(
           <Card onClick={this.onMouseOverQuestion.bind(this,i,obj,finalTemplete)}
                 onMouseOut={this.onMouseOut}
                 zDepth={this.state.questionsShadow[i]} >
               <CardText>
                  <h3 style={{marginTop:'3%',marginLeft:'3%',marginBottom:'3%',color:'#000000',textAlign:'left'}}>
                  {i+1}:{obj.questions[i].questionQ}
                  </h3>
                  <TextField
                          hintText="Your Answer Here"
                          hintStyle={{fontWeight:'bold'}}
                          underlineStyle={{borderColor:'#37861E '}}
                          style={{width:'60%',marginTop:'3%                                                                                                                                                                                                                                                                                                                                   '}}
                    />
               </CardText>
           
         </Card>)
      }
      if(obj.questions[i].questionType=='CommentText')
          {
        return(
           <Card onClick={this.onMouseOverQuestion.bind(this,i,obj,finalTemplete)}
                 onMouseOut={this.onMouseOut}
                 zDepth={this.state.questionsShadow[i]}>
               <CardText>
                  <h3 style={{marginTop:'3%',marginLeft:'3%',marginBottom:'3%',color:'#000000',textAlign:'left'}}>
                  {i+1}:{obj.questions[i].questionQ}
                  </h3>
                  <Textarea
                           useCacheForDOMMeasurements
                           placeholder="Your Comments Here in less than 500 words"
                           hintStyle={{fontWeight:'bold'}}
                           underlineStyle={{borderColor:'#37861E '}}
                           minRows={5}
                           style={{width:'80%',marginLeft:'1%',marginTop:'4%'}}
                           multiLine={true} 
                     />
               </CardText>
           
         </Card>)
      }
      if(obj.questions[i].questionType=='MultiChoice')
          {
            var options=[];
             obj.questions[i].options.map((option)=>{
             options.push(
                  <RadioButton
                    value={option}
                    label={option}
                    iconStyle={{marginLeft:'35%'}}
                    labelStyle={ {marginLeft:'0'}}/>);

              });
          return(
            <Card onClick={this.onMouseOverQuestion.bind(this,i,obj,finalTemplete)}
                 onMouseOut={this.onMouseOut}
                 zDepth={this.state.questionsShadow[i]}>
               <CardText>
                  <h3 style={{marginTop:'3%',marginLeft:'3%',marginBottom:'3%',color:'#000000',textAlign:'left'}}>
                  {i+1}:{obj.questions[i].questionQ}
                  </h3>
                  <RadioButtonGroup name="MultiChoice" style={{textAlign:'left',marginLeft:'5%',marginTop:'2%'}}>
                    {options}
                  </RadioButtonGroup>
               </CardText>
           
          </Card>)
      }
      if(obj.questions[i].questionType=='Checkbox')
          {
             var options=[];
             obj.questions[i].options.map((option)=>{
             options.push(<div>
                 <Checkbox label={option}  iconStyle={{marginLeft:'35%'}} labelStyle={{marginRight:'50%',color:'#000000',marginLeft:'2%'}}/>
                 </div>);

               });

        return(
           <Card onClick={this.onMouseOverQuestion.bind(this,i,obj,finalTemplete)}>
               <CardText>
                  <h3 style={{marginTop:'3%',marginLeft:'3%',marginBottom:'3%',color:'#000000',textAlign:'left'}}>
                  {i+1}:{obj.questions[i].questionQ}
                  </h3>
                  {options}
               </CardText>
           
         </Card>)
      }
      if(obj.questions[i].questionType=='Dropdown')
          {
            var options=[];
            var index=1;
            options.push(<MenuItem value={index} primaryText="Select an option"/>);
            obj.questions[i].options.map((option)=>{index++;
            options.push(<MenuItem value={index} primaryText={option}/>);
              });
        return(
           <Card onClick={this.onMouseOverQuestion.bind(this,i,obj,finalTemplete)} >
               <CardText>
                  <h3 style={{marginTop:'3%',marginLeft:'3%',marginBottom:'3%',color:'#000000',textAlign:'left'}}>
                  {i+1}:{obj.questions[i].questionQ}
                  </h3>
                  <SelectField value={1}>{options}</SelectField>
               </CardText>
           
         </Card>)
      }
      if(obj.questions[i].questionType=='YesOrNo')
         {
        return(
           <Card onClick={this.onMouseOverQuestion.bind(this,i,obj,finalTemplete)} >
               <CardText>
                  <h3 style={{marginTop:'3%',marginLeft:'3%',marginBottom:'3%',color:'#000000',textAlign:'left'}}>
                  {i+1}:{obj.questions[i].questionQ}
                  </h3>
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
           
         </Card>)
      }
      if(obj.questions[i].questionType=='Slider')
          {
            tempValue=this.state.dataChange;
            
        return(
           <Card onClick={this.onMouseOverQuestion.bind(this,i,obj,finalTemplete)}>
               <CardText>
                  <h3 style={{marginTop:'3%',marginLeft:'3%',marginBottom:'3%',color:'#000000',textAlign:'left'}}>
                  {i+1}:{obj.questions[i].questionQ}
                  </h3>
                  <Slider
                      min={0}
                      max={obj.questions[i].maxValue}
                      step={obj.questions[i].scale}
                      tooltip={true}
                      value={tempValue[i]}
                      orientation="horizontal"
                      onChange={this.handleOnChange.bind(this,i)}
                  />

                  <span style={{fontWeight:'bold'}}>Your Score : </span>
                  <span style={{fontWeight:'bold'}}>
                  <TextField
                    ref="slider"
                    value={tempValue[i]}
                    onChange={this.handleSliderChange.bind(this,i,100)}
                    style={{width:"20%"}}
                    inputStyle={{textAlign:'center'}}
                    type = 'number'
                    errorText= {this.state.errorText}
                  />
                  </span>
                  <span style={{fontWeight:'bold',marginLeft:'2%'}}>{'/'}</span>
                  <span style={{fontWeight:'bold',marginLeft:'2%'}}>
                        {obj.questions[i].maxValue}
                  </span>
               </CardText>
           
         </Card>)
      }
      if(obj.questions[i].questionType=='StarRating')
         { 
           var options=[];
           
              options.push(
                <section  style={{marginLeft:'30%'}} >
                  <ReactStars
                    count={obj.questions[i].options.length}
                    onChange={this.ratingChanged.bind(this,obj.questions[i].options.length)}
                    value={this.state.starVal}
                    size={35}
                    color2={this.state.starColor} />
                    <p style={{fontWeight:'bold',textAlign:'left',fontSize:'115%',marginLeft:'3%'}}>{this.state.starComment}</p>
                </section>    
                      );

        return(
           <Card onClick={this.onMouseOverQuestion.bind(this,i,obj,finalTemplete)} >
               <CardText>
                  <h3 style={{marginTop:'3%',marginLeft:'3%',marginBottom:'3%',color:'#000000',textAlign:'left'}}>
                  {i+1}:{obj.questions[i].questionQ}
                  </h3>
                  {options}
               </CardText>
           
         </Card>)
      }
      if(obj.questions[i].questionType=='DatePicker')
         {
        return(
           <Card onClick={this.onMouseOverQuestion.bind(this,i,obj,finalTemplete)}>
               <CardText>
                  <h3 style={{marginTop:'3%',marginLeft:'3%',marginBottom:'3%',color:'#000000',textAlign:'left'}}>
                  {i+1}:{obj.questions[i].questionQ}
                  </h3>
                  <section onMouseDown={ this.handleContainerMouseDown } style={{paddingBottom:'30%'}} >
                      <TextField
                        type="text"
                        ref={ (el) => { this.input = el; } }
                        placeholder="MM/DD/YYYY"
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
           
         </Card>)
      }
      if(obj.questions[i].questionType=='DateRange')
         {
        return(
           <Card onClick={this.onMouseOverQuestion.bind(this,i,obj,finalTemplete)} >
               <CardText>
                  <h3 style={{marginTop:'3%',marginLeft:'3%',marginBottom:'3%',color:'#000000',textAlign:'left'}}>
                  {i+1}:{obj.questions[i].questionQ}
                  </h3>
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
               </CardText>
           
         </Card>)
      }
      if(obj.questions[i].questionType=='NumberChoice')
          {
            var options=[];
             obj.questions[i].options.map((option)=>{
             options.push(
                  <RadioButton
                    value={option}
                    label={option}
                    style={{marginLeft:0,marginRight:0,width:'10%'}}
                    inputStyle={{marginLeft:'20%'}}
                    labelStyle={ {marginLeft:'5%',marginRight:'20%'}}
                    iconStyle={{marginLeft:'10%',marginRight:'2%'}}
                  />);

              });
          return(
            <Card onClick={this.onMouseOverQuestion.bind(this,i,obj,finalTemplete)}>
               <CardText>
                  <h3 style={{marginTop:'3%',marginLeft:'3%',marginBottom:'3%',color:'#000000',textAlign:'left'}}>
                  {i+1}:{obj.questions[i].questionQ}
                  </h3>
                  <RadioButtonGroup name="NumberChoice" style={{textAlign:'left',marginTop:'2%',marginLeft:'10%',display:"flex",width:'100%'}} >
                    {options}
                  </RadioButtonGroup>
               </CardText>
           
          </Card>)
      }
            }));
    }
    
    this.state.questionSelection.map((val,index)=>{
        
      if(val.selection==true)
      {
        console.log("index"+index);
        if(this.state.questType=='SingleText' )
         {
         
         console.log("inside single text");
        return(
        finalTemplete[0].splice(index,1,<Card>
          <CardHeader>
                <SelectType getQuestionType={this.onChangeQuestType.bind(this)}  /> 
            </CardHeader>

            <Divider />
          <CardText>
            <TextField
                hintText="Your Question"
                hintStyle={{fontWeight:'bold'}}
                value={this.state.questionQuest}
                multiLine={true}
                underlineStyle={{borderColor:'#37861E '}}
                style={{marginTop:0,marginLeft:'2%',width:'80%',marginBottom:0,color:'#000000',textAlign:'left'}}
                onChange={this.questionQuestChange.bind(this)}
            />
            <SingleText type={this.getType.bind(this)} />
          </CardText>
          <Col offset={3}>
              <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <DuplicateButton style={iconStyles}/>
              </IconButton>  
              <IconButton  tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                     <CloseButton style={iconStyles}/>
              </IconButton>
              
          </Col>      
        </Card>)
        )
      }
      else if(this.state.questType=='CommentText' )
         {
         
            console.log("inside comment text");        
        return(
        finalTemplete[0].splice(index,1,<Card>
          <CardHeader>
                <SelectType getQuestionType={this.onChangeQuestType.bind(this)}  /> 
            </CardHeader>

            <Divider />
          <CardText>
            <TextField
                hintText="Your Question"
                hintStyle={{fontWeight:'bold'}}
                value={this.state.questionQuest}
                multiLine={true}
                underlineStyle={{borderColor:'#37861E '}}
                style={{marginTop:0,marginLeft:'2%',width:'80%',marginBottom:0,color:'#000000',textAlign:'left'}}
                onChange={this.questionQuestChange.bind(this)}
            />
            <CommentText type={this.getType.bind(this)} />
          </CardText>
          <Col offset={3}>
              <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <DuplicateButton style={iconStyles}/>
              </IconButton>  
              <IconButton  tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                     <CloseButton style={iconStyles}/>
              </IconButton>
              
          </Col>      
        </Card>)
        )
      }
      else if(this.state.questType=='MultiChoice' )
         {
         
            console.log("inside comment text");        
        return(
        finalTemplete[0].splice(index,1,<Card >
          <CardHeader>
                <SelectType getQuestionType={this.onChangeQuestType.bind(this)}  /> 
            </CardHeader>

            <Divider />
          <CardText>
            <TextField
                hintText="Your Question"
                hintStyle={{fontWeight:'bold'}}
                value={this.state.questionQuest}
                multiLine={true}
                underlineStyle={{borderColor:'#37861E '}}
                style={{marginTop:0,marginLeft:'2%',width:'80%',marginBottom:0,color:'#000000',textAlign:'left'}}
                onChange={this.questionQuestChange.bind(this)}
            />
             <MultiChoice  getMultiChoiceOptions={ oldOptions => this.setoldOption(index) } index={index} type={this.getType.bind(this)}  options={this.onChangeOptions.bind(this)}  />
          </CardText>
          <Col offset={3}>
              <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <DuplicateButton style={iconStyles}/>
              </IconButton>  
              <IconButton  tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                     <CloseButton style={iconStyles}/>
              </IconButton>
              
          </Col>      
        </Card>)
        )
      }
      else if(this.state.questType=='Checkbox' )
         {
         
            console.log("inside comment text");        
        return(
        finalTemplete[0].splice(index,1,<Card >
          <CardHeader>
                <SelectType getQuestionType={this.onChangeQuestType.bind(this)}  /> 
            </CardHeader>

            <Divider />
          <CardText>
            <TextField
                hintText="Your Question"
                hintStyle={{fontWeight:'bold'}}
                value={this.state.questionQuest}
                multiLine={true}
                underlineStyle={{borderColor:'#37861E '}}
                style={{marginTop:0,marginLeft:'2%',width:'80%',marginBottom:0,color:'#000000',textAlign:'left'}}
                onChange={this.questionQuestChange.bind(this)}
            />
             
             <CheckBox getCheckboxOptions={ oldOptions => this.setoldOption(index) } index={index} type={this.getType.bind(this)}  options={this.onChangeOptions.bind(this)}/>
          </CardText>
          <Col offset={3}>
              <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <DuplicateButton style={iconStyles}/>
              </IconButton>  
              <IconButton  tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                     <CloseButton style={iconStyles}/>
              </IconButton>
              
          </Col>      
        </Card>)
        )
      }
      else if(this.state.questType=='Dropdown' )
         {
         
            console.log("inside comment text");        
        return(
        finalTemplete[0].splice(index,1,<Card >
          <CardHeader>
                <SelectType getQuestionType={this.onChangeQuestType.bind(this)}  /> 
            </CardHeader>

            <Divider />
          <CardText>
            <TextField
                hintText="Your Question"
                hintStyle={{fontWeight:'bold'}}
                value={this.state.questionQuest}
                multiLine={true}
                underlineStyle={{borderColor:'#37861E '}}
                style={{marginTop:0,marginLeft:'2%',width:'80%',marginBottom:0,color:'#000000',textAlign:'left'}}
                onChange={this.questionQuestChange.bind(this)}
            />
             
             <DropDown getDropdownOptions={ oldOptions => this.setoldOption(index) } index={index} type={this.getType.bind(this)} options={this.onChangeOptions.bind(this)}/>
          </CardText>
          <Col offset={3}>
              <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <DuplicateButton style={iconStyles}/>
              </IconButton>  
              <IconButton  tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                     <CloseButton style={iconStyles}/>
              </IconButton>
              
          </Col>      
        </Card>)
        )
      }
      else if(this.state.questType=='YesOrNo' )
         {
         
            console.log("inside comment text");        
        return(
        finalTemplete[0].splice(index,1,<Card >
          <CardHeader>
                <SelectType getQuestionType={this.onChangeQuestType.bind(this)}  /> 
            </CardHeader>

            <Divider />
          <CardText>
            <TextField
                hintText="Your Question"
                hintStyle={{fontWeight:'bold'}}
                value={this.state.questionQuest}
                multiLine={true}
                underlineStyle={{borderColor:'#37861E '}}
                style={{marginTop:0,marginLeft:'2%',width:'80%',marginBottom:0,color:'#000000',textAlign:'left'}}
                onChange={this.questionQuestChange.bind(this)}
            />
             
            <YesOrNo type={this.getType.bind(this)} />
          </CardText>
          <Col offset={3}>
              <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <DuplicateButton style={iconStyles}/>
              </IconButton>  
              <IconButton  tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                     <CloseButton style={iconStyles}/>
              </IconButton>
              
          </Col>      
        </Card>)
        )
      }
      else if(this.state.questType=='Slider' )
         {
         
            console.log("inside comment text");        
        return(
        finalTemplete[0].splice(index,1,<Card >
          <CardHeader>
                <SelectType getQuestionType={this.onChangeQuestType.bind(this)}  /> 
            </CardHeader>

            <Divider />
          <CardText>
            <TextField
                hintText="Your Question"
                hintStyle={{fontWeight:'bold'}}
                value={this.state.questionQuest}
                multiLine={true}
                underlineStyle={{borderColor:'#37861E '}}
                style={{marginTop:0,marginLeft:'2%',width:'80%',marginBottom:0,color:'#000000',textAlign:'left'}}
                onChange={this.questionQuestChange.bind(this)}
            />
             
             <SliderComponent getSliderOptions={ oldOptions => this.setoldOption(index) } index={index} type={this.getType.bind(this)} getMaxValue={this.onChangeMax.bind(this)} getScale={this.onChangeScale.bind(this)}/>
          </CardText>
          <Col offset={3}>
              <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <DuplicateButton style={iconStyles}/>
              </IconButton>  
              <IconButton  tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                     <CloseButton style={iconStyles}/>
              </IconButton>
              
          </Col>      
        </Card>)
        )
      }
      else if(this.state.questType=='StarRating' )
         {
         
            console.log("inside comment text");        
        return(
        finalTemplete[0].splice(index,1,<Card >
          <CardHeader>
                <SelectType getQuestionType={this.onChangeQuestType.bind(this)}  /> 
            </CardHeader>

            <Divider />
          <CardText>
            <TextField
                hintText="Your Question"
                hintStyle={{fontWeight:'bold'}}
                value={this.state.questionQuest}
                multiLine={true}
                underlineStyle={{borderColor:'#37861E '}}
                style={{marginTop:0,marginLeft:'2%',width:'80%',marginBottom:0,color:'#000000',textAlign:'left'}}
                onChange={this.questionQuestChange.bind(this)}
            />
             
             <StarRate getStarOptions={ oldOptions => this.setoldOption(index) } index={index} type={this.getType.bind(this)} scale={this. onChangeStarScale.bind(this)}/>
          </CardText>
          <Col offset={3}>
              <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <DuplicateButton style={iconStyles}/>
              </IconButton>  
              <IconButton  tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                     <CloseButton style={iconStyles}/>
              </IconButton>
              
          </Col>      
        </Card>)
        )
      }
      else if(this.state.questType=='DatePicker' )
         {
         
            console.log("inside comment text");        
        return(
        finalTemplete[0].splice(index,1,<Card >
          <CardHeader>
                <SelectType getQuestionType={this.onChangeQuestType.bind(this)}  /> 
            </CardHeader>

            <Divider />
          <CardText>
            <TextField
                hintText="Your Question"
                hintStyle={{fontWeight:'bold'}}
                value={this.state.questionQuest}
                multiLine={true}
                underlineStyle={{borderColor:'#37861E '}}
                style={{marginTop:0,marginLeft:'2%',width:'80%',marginBottom:0,color:'#000000',textAlign:'left'}}
                onChange={this.questionQuestChange.bind(this)}
            />
             
            <DatePicker type={this.getType.bind(this)} />
          </CardText>
          <Col offset={3}>
              <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <DuplicateButton style={iconStyles}/>
              </IconButton>  
              <IconButton  tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                     <CloseButton style={iconStyles}/>
              </IconButton>
              
          </Col>      
        </Card>)
        )
      }
      else if(this.state.questType=='DateRange' )
         {
         
            console.log("inside comment text");        
        return(
        finalTemplete[0].splice(index,1,<Card >
          <CardHeader>
                <SelectType getQuestionType={this.onChangeQuestType.bind(this)}  /> 
            </CardHeader>

            <Divider />
          <CardText>
            <TextField
                hintText="Your Question"
                hintStyle={{fontWeight:'bold'}}
                value={this.state.questionQuest}
                multiLine={true}
                underlineStyle={{borderColor:'#37861E '}}
                style={{marginTop:0,marginLeft:'2%',width:'80%',marginBottom:0,color:'#000000',textAlign:'left'}}
                onChange={this.questionQuestChange.bind(this)}
            />
             
            <DateRange type={this.getType.bind(this)} />
          </CardText>
          <Col offset={3}>
              <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <DuplicateButton style={iconStyles}/>
              </IconButton>  
              <IconButton  tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                     <CloseButton style={iconStyles}/>
              </IconButton>
              
          </Col>      
        </Card>)
        )
      }
      else if(this.state.questType=='NumberChoice' )
         {
         
            console.log("inside comment text");        
        return(
        finalTemplete[0].splice(index,1,<Card >
          <CardHeader>
                <SelectType getQuestionType={this.onChangeQuestType.bind(this)}  /> 
            </CardHeader>

            <Divider />
          <CardText>
            <TextField
                hintText="Your Question"
                hintStyle={{fontWeight:'bold'}}
                value={this.state.questionQuest}
                multiLine={true}
                underlineStyle={{borderColor:'#37861E '}}
                style={{marginTop:0,marginLeft:'2%',width:'80%',marginBottom:0,color:'#000000',textAlign:'left'}}
                onChange={this.questionQuestChange.bind(this)}
            />
             
            <NumberChoice getNumberChoiceOptions={ oldOptions => this.setoldOption(index) } index={index} type={this.getType.bind(this)} scale={this. onChangeNumberScale.bind(this)} />
          </CardText>
          <Col offset={3}>
              <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <DuplicateButton style={iconStyles}/>
              </IconButton>  
              <IconButton  tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                     <CloseButton style={iconStyles}/>
              </IconButton>
              
          </Col>      
        </Card>)
        )
      }
      }
      
    });
  

   return(<div>
     
      
                {finalTemplete}
                
   </div>);
 }
}

export default DisplayArea;
