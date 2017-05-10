/* eslint-disable */
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
import Subheader from 'material-ui/Subheader';
import request from 'superagent';
import CloseButton from 'material-ui/svg-icons/navigation/close';
import DuplicateButton from 'material-ui/svg-icons/content/content-copy';
import Add from 'material-ui/svg-icons/content/add-circle';
import EditButton from 'material-ui/svg-icons/image/edit';
import {IndexLink, Link} from 'react-router';
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
import DisplayArea from '../component/DisplayArea';
import ReactStars from 'react-stars';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

var arr;
var tempQuestion;
var index=0;

var questionsArray=[];
var questions=[];
var options=[];
var selOpt=[];
var optionTempArray=[];
var sName="tempData";


const welcomeStyle={
background:'#0b0c66',
textAlign:'center',
height:'20%',

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

const thanksStyle={
background:'#0b0c66',
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

class NewTemplate  extends Component {
  constructor() {
     super();
    this.state = {

       output:[],
       sliderChange:0,
       starRating: 1,
       starComment:'',
       volume: 0,
       open:false,
       dataChange:[],
       welcome:false,
       thankYou:false,
       question:false,
       welcomeMsg:"Survey Title",
       description:"Description",
       thanksMsg:'Thank You Message',
       createrName:'Creater Name',
       createrContact:'Creater Contact',
       createrMail:'Creater Mail ID',
       value: 1,
       fullTemplate:[],
       questionChange:'',
       typeValue:0,
       optionArr: [' '],
       optionsArr:[],
       type:'',
       questionQ:'',
       maxValue:0,
       scaleValue:0,
       numberScale:0,
       checkText:'check text'

    }
  }
onMouseOverWelcome = () => this.setState({welShadow: 3,welcome:true,thankYou:false,question:false,queShadow:0,thanksShadow:0});
onMouseOverQuestions = () => this.setState({queShadow: 3,question:true,welcome:false,thankYou:false,welShadow:0,thanksShadow:0});
onMouseOverthanks = () => this.setState({thanksShadow: 3,thankYou:true,welcome:false,question:false,welShadow:0,queShadow:0});

welcomeChange(e){
  this.setState({welcomeMsg:e.target.value});
  console.log("e.target.value",e.target.value);
  var x={welcomeMsg:e.target.value};
  console.log("var x",x)
  request.put('http://localhost:9080/api/addData')
  .set('Content-Type','application/json')
  .send(x)
  .then((err,res)=>{
    console.log("posted welcome msg");
  });
};

descriptionChange(e){
  this.setState({description:e.target.value});
  console.log("e.target.value",e.target.value);
  var x={description:e.target.value};
  console.log("var x",x)
  request.put('http://localhost:9080/api/addData')
  .set('Content-Type','application/json')
  .send(x)
  .then((err,res)=>{
    console.log("posted discription");
  });
};

thanksChange(e){
   this.setState({thanksMsg:e.target.value});
   console.log("e.target.value",e.target.value);
   var x={thanksMsg:e.target.value};
   console.log("var x",x)
   request.put('http://localhost:9080/api/addData')
   .set('Content-Type','application/json')
   .send(x)
   .then((err,res)=>{
     console.log("posted thanks message");
   });
};

createrNameChange(e){
   this.setState({createrName:e.target.value});
   console.log("e.target.value",e.target.value);
   var x={createrName:e.target.value};
   console.log("var x",x)
   request.put('http://localhost:9080/api/addData')
   .set('Content-Type','application/json')
   .send(x)
   .then((err,res)=>{
     console.log("posted createrName");
   });
};

createrContactChange(e){
   this.setState({createrContact:e.target.value});
   console.log("e.target.value",e.target.value);
   var x={createrContact:e.target.value};
   console.log("var x",x)
   request.put('http://localhost:9080/api/addData')
   .set('Content-Type','application/json')
   .send(x)
   .then((err,res)=>{
     console.log("posted creater contact");
   });
};

createrMailChange(e){
   this.setState({createrMail:e.target.value});
   console.log("e.target.value",e.target.value);
   var x={createrMail:e.target.value};
   console.log("var x",x)
   request.put('http://localhost:9080/api/addData')
   .set('Content-Type','application/json')
   .send(x)
   .then((err,res)=>{
     console.log("posted creater email");
   });
};

questionChange(e){
  // var temp=this.state.fullTemplate;
  // questionsArray[i]={"question":e.target.value,"type":typeValue}
  this.setState({questionChange:e.target.value})
   var components=[];


}


onChangeQuestType(quest){
    this.setState({ questType:quest})

}

/*AddNew button event*/
addNewQuestion(question,type,options,scale,maxValue){
  var tempType=type
  console.log("question"+question);
  console.log("type"+type);
  console.log("options"+options)
  console.log("tempType"+tempType)
  var arr=this.state.fullTemplate;

    //arr[index]=value;
    if(tempType=="SingleText")  {

        arr[index]=({"questionType":type,"questionQ":question,"options":options});
        console.log("inside");

      }
    else if(tempType=="CommentText")  {

        arr[index]=({"questionType":type,"questionQ":question,"options":options});
        console.log("inside");

      }
    else if(tempType=="MultiChoice")  {

        arr[index]=({"questionType":type,"questionQ":question,"options":options});
        console.log("inside");

      }
    else if(tempType=="Checkbox")  {

        arr[index]=({"questionType":type,"questionQ":question,"options":options});
        console.log("inside");

      }
    else if(tempType=="Dropdown")  {

        arr[index]=({"questionType":type,"questionQ":question,"options":options});
        console.log("inside");

      }
    else if(tempType=="YesOrNo")  {

        arr[index]=({"questionType":type,"questionQ":question,"options":options});
        console.log("inside");

      }
    else if(tempType=="Slider")  {

        arr[index]=({"questionType":type,"questionQ":question,"options":options,"scale":scale,"maxValue":maxValue});
        console.log("inside");

      }
    else if(tempType=="StarRating")  {
        optionTempArray=[];

        for(let i=0;i<scale;){

            optionTempArray.push(++i);

            }
        arr[index]=({"questionType":type,"questionQ":question,"options":optionTempArray,"scale":scale});
        console.log("inside");

      }

    else if(tempType=="DatePicker")  {

        arr[index]=({"questionType":type,"questionQ":question,"options":options});
        console.log("inside");

      }

    else if(tempType=="DateRange")  {

        arr[index]=({"questionType":type,"questionQ":question,"options":options});
        console.log("inside");

      }

    else if(tempType=="NumberChoice")  {
      optionTempArray=[];

        for(let i=0;i<scale;){

            optionTempArray.push(++i);

            }

        arr[index]=({"questionType":type,"questionQ":question,"options":optionTempArray,"scale":scale});
        console.log("inside");

      }

    this.setState({fullTemplate:arr});
    var result={questions:arr[0]};
    console.log(result)
     index=index+1;
     console.log(arr);
     request.post('http://localhost:9080/api/addTempQuestions/'+sName)

          .set('Content-Type', 'application/json')
          .send(arr)
           .end((err,res)=>
           {
            if(err)
            {

             console.log("Error"+err);

            }
            else
            {
              console.log("Posted",res);
            }

            })
    //this.props.tempArr(this.state.checkText);


}

 /*Editing Props Value*/
onChangeOptions(options)
  {
    this.setState({ optionsArr:options })
  }

 getType(type)
  {
    this.setState({ type:type })
  }
  onChangeQuest(quest)
  {
    this.setState({  questionQ:quest })
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


  componentWillMount() {

    }



render() {
   var welcomeTitle=[];
   var thanksMessage=[];
   //var questions=[];
   //var options=[];
   //var  selOpt=[];



   welcomeTitle.push(
  <Col xs={12}>
      <h3 style={{marginTop:'2%',marginBottom:'2%',fontSize:'150%',color:'#FFFFFF',paddingTop:10}}>{this.state.welcomeMsg}</h3>
      <Divider/>
      <h4 style={{marginTop:'1%',marginLeft:'1%',color:'#FFFFFF',textAlign:'left'}}>{this.state.description}</h4>

</Col>
    );
    questions.push(
      <Col xs={12}>
        <Card
            onClick={this.onMouseOverQuestions}
            zDepth={this.state.queShadow}
            >
            <CardHeader>


                <SelectType getQuestionType={this.onChangeQuestType.bind(this)}  />

            </CardHeader>
            <Divider />
            <CardText>
          <h3 style={{marginTop:'5%',marginBottom:'5%',color:'#818181',height:'50%'}}>Your Questions </h3>
          </CardText>

        </Card>
       </Col>
      );
    thanksMessage.push(
<Col xs={12}>
       <h3 style={{marginTop:'2%',marginBottom:'2%',color:'#FFFFFF'}}>{this.state.thanksMsg}</h3>
       <Divider/>
       <h4 style={{marginTop:'1%',marginLeft:'1%',color:'',textAlign:'left',color:'#FFFFFF'}}>{this.state.createrName}</h4>
       <h4 style={{marginTop:0,marginLeft:'1%',color:'#FFFFFF',textAlign:'left'}}>{this.state.createrContact}</h4>
       <h4 style={{marginTop:0,marginLeft:'1%',color:'#FFFFFF',textAlign:'left'}}>{this.state.createrMail}</h4>
</Col>
      );
      if(this.state.welcome)
      {
        console.log("state", this.state.output.welcomeMsg);
        welcomeTitle.pop();
        questions.pop();
        welcomeTitle.push(<div>
        <TextField
         id="text-field-welcome"
         value={this.state.welcomeMsg}
         style={{marginTop:'2%',marginBottom:'2%',paddingTop:10,width:'80%',fontSize:'150%'}}
         inputStyle={{color:'#FFFFFF'}}
         onChange={this.welcomeChange.bind(this)} />

         <Divider/>
        <TextField
        style={{marginTop:'1%',marginLeft:'1%',width:'80%',textAlign:'left'}}
        id="text-field-description"
        value={this.state.description}
        multiLine={true}
        textareaStyle={{color:'#FFFFFF'}}
        onChange={this.descriptionChange.bind(this)}/>
       </div>);
      }
      if(this.state.thankYou)
      {
        console.log("state", this.state.output.welcomeMsg);
        thanksMessage.pop();
        questions.pop();
        thanksMessage.push(<div>
          <TextField
         id="text-field-thanks"
         value={this.state.thanksMsg}
         style={{marginTop:'2%',marginBottom:'2%'}}
         inputStyle={{color:'#FFFFFF'}}
          onChange={this.thanksChange.bind(this)}
         />
          <Divider/>
          <TextField
         id="text-field-createrName"
         value={this.state.createrName}
         style={{marginTop:'2%',marginBottom:'2%'}}
         inputStyle={{color:'#FFFFFF'}}
          onChange={this.createrNameChange.bind(this)}
         />
          <TextField
         id="text-field-createrContact"
         value={this.state.createrContact}
         style={{marginTop:'2%',marginBottom:'2%'}}
         inputStyle={{color:'#FFFFFF'}}
         onChange={this.createrContactChange.bind(this)}
         />
         <TextField
         id="text-field-createrMail"
         value={this.state.createrMail}
         style={{marginTop:'2%',marginBottom:'2%'}}
         inputStyle={{color:'#FFFFFF'}}
          onChange={this.createrMailChange.bind(this)}
         />
                </div>);
      }
      if(this.state.question)
      {

         questions.pop();



if(this.state.questType==1){

   questions.pop();
   questions.push( <Card>
            <CardHeader>
                <SelectType getQuestionType={this.onChangeQuestType.bind(this)}  />
            </CardHeader>

            <Divider />

             <CardText>
               <SingleText type={this.getType.bind(this)} question={this.onChangeQuest.bind(this)}/>
            </CardText>

           <Col offset={3}>
              <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <DuplicateButton style={iconStyles}/>
              </IconButton>
              <IconButton  tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                     <CloseButton style={iconStyles}/>
              </IconButton>
              <IconButton onClick={this.addNewQuestion.bind(this,this.state. questionQ,this.state.type,'','','')} tooltip="Add New Question" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <Add style={iconStyles}/>
              </IconButton>
          </Col>
  </Card>);

}
else if(this.state.questType==2){

   questions.pop();
   questions.push( <Card>
            <CardHeader>
                <SelectType getQuestionType={this.onChangeQuestType.bind(this)}  />
            </CardHeader>

            <Divider />

             <CardText>
               <CommentText type={this.getType.bind(this)} question={this.onChangeQuest.bind(this)}/>
            </CardText>

           <Col offset={3}>
              <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <DuplicateButton style={iconStyles}/>
              </IconButton>
              <IconButton  tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                     <CloseButton style={iconStyles}/>
              </IconButton>
              <IconButton onClick={this.addNewQuestion.bind(this,this.state. questionQ,this.state.type,'','','')} tooltip="Add New Question" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <Add style={iconStyles}/>
              </IconButton>
          </Col>
  </Card>);
  }
else if(this.state.questType==3){

   questions.pop();
   questions.push( <Card>
            <CardHeader>
                <SelectType getQuestionType={this.onChangeQuestType.bind(this)}  />
            </CardHeader>

            <Divider />

             <CardText>
               <MultiChoice type={this.getType.bind(this)} question={this.onChangeQuest.bind(this)}  options={this.onChangeOptions.bind(this)}/>
            </CardText>

           <Col offset={3}>
              <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <DuplicateButton style={iconStyles}/>
              </IconButton>
              <IconButton  tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                     <CloseButton style={iconStyles}/>
              </IconButton>
              <IconButton onClick={this.addNewQuestion.bind(this,this.state. questionQ,this.state.type,this.state.optionsArr,'','')} tooltip="Add New Question" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <Add style={iconStyles}/>
              </IconButton>
          </Col>
  </Card>);
}
else if(this.state.questType==4){

  questions.pop();
   questions.push( <Card>
            <CardHeader>
                <SelectType getQuestionType={this.onChangeQuestType.bind(this)}  />
            </CardHeader>

            <Divider />

             <CardText>
               <CheckBox type={this.getType.bind(this)} question={this.onChangeQuest.bind(this)}  options={this.onChangeOptions.bind(this)}/>
            </CardText>

           <Col offset={3}>
              <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <DuplicateButton style={iconStyles}/>
              </IconButton>
              <IconButton  tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                     <CloseButton style={iconStyles}/>
              </IconButton>
              <IconButton onClick={this.addNewQuestion.bind(this,this.state. questionQ,this.state.type,this.state.optionsArr,'','')} tooltip="Add New Question" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <Add style={iconStyles}/>
              </IconButton>
          </Col>
  </Card>);
}
else if(this.state.questType==5){


    questions.pop();
   questions.push( <Card>
            <CardHeader>
                <SelectType getQuestionType={this.onChangeQuestType.bind(this)}  />
            </CardHeader>

            <Divider />

             <CardText>
               <DropDown type={this.getType.bind(this)} question={this.onChangeQuest.bind(this)}  options={this.onChangeOptions.bind(this)}/>
            </CardText>

           <Col offset={3}>
              <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <DuplicateButton style={iconStyles}/>
              </IconButton>
              <IconButton  tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                     <CloseButton style={iconStyles}/>
              </IconButton>
              <IconButton onClick={this.addNewQuestion.bind(this,this.state.questionQ,this.state.type,this.state.optionsArr,'','')} tooltip="Add New Question" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <Add style={iconStyles}/>
              </IconButton>
          </Col>
  </Card>);
}
else if(this.state.questType==6){

    questions.pop();
   questions.push( <Card>
            <CardHeader>
                <SelectType getQuestionType={this.onChangeQuestType.bind(this)}  />
            </CardHeader>

            <Divider />

             <CardText>
               <YesOrNo type={this.getType.bind(this)} question={this.onChangeQuest.bind(this)}/>
            </CardText>

           <Col offset={3}>
              <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <DuplicateButton style={iconStyles}/>
              </IconButton>
              <IconButton  tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                     <CloseButton style={iconStyles}/>
              </IconButton>
              <IconButton onClick={this.addNewQuestion.bind(this,this.state.questionQ,this.state.type,'','','')} tooltip="Add New Question" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <Add style={iconStyles}/>
              </IconButton>
          </Col>
  </Card>);
}
else if(this.state.questType==7){

 questions.pop();
   questions.push( <Card>
            <CardHeader>
                <SelectType getQuestionType={this.onChangeQuestType.bind(this)}  />
            </CardHeader>

            <Divider />

             <CardText>
               <SliderComponent getMaxValue={this.onChangeMax.bind(this)} getScale={this.onChangeScale.bind(this)} type={this.getType.bind(this)} question={this.onChangeQuest.bind(this)}/>
            </CardText>

           <Col offset={3}>
              <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <DuplicateButton style={iconStyles}/>
              </IconButton>
              <IconButton  tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                     <CloseButton style={iconStyles}/>
              </IconButton>
              <IconButton onClick={this.addNewQuestion.bind(this,this.state.questionQ,this.state.type,'',this.state.scaleValue,this.state.maxValue)} tooltip="Add New Question" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <Add style={iconStyles}/>
              </IconButton>
          </Col>
  </Card>);
}
else if(this.state.questType==8){

questions.pop();
   questions.push( <Card>
            <CardHeader>
                <SelectType getQuestionType={this.onChangeQuestType.bind(this)}  />
            </CardHeader>

            <Divider />

             <CardText>
               <StarRate scale={this. onChangeStarScale.bind(this)}  type={this.getType.bind(this)} question={this.onChangeQuest.bind(this)}/>
            </CardText>

           <Col offset={3}>
              <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <DuplicateButton style={iconStyles}/>
              </IconButton>
              <IconButton  tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                     <CloseButton style={iconStyles}/>
              </IconButton>
              <IconButton onClick={this.addNewQuestion.bind(this,this.state.questionQ,this.state.type,'',this.state.scale,'')} tooltip="Add New Question" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <Add style={iconStyles}/>
              </IconButton>
          </Col>
  </Card>);
}
else if(this.state.questType==10){

questions.pop();
   questions.push( <Card>
            <CardHeader>
                <SelectType getQuestionType={this.onChangeQuestType.bind(this)}  />
            </CardHeader>

            <Divider />

             <CardText>
               <DatePicker type={this.getType.bind(this)} question={this.onChangeQuest.bind(this)}/>
            </CardText>

           <Col offset={3}>
              <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <DuplicateButton style={iconStyles}/>
              </IconButton>
              <IconButton  tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                     <CloseButton style={iconStyles}/>
              </IconButton>
              <IconButton onClick={this.addNewQuestion.bind(this,this.state.questionQ,this.state.type,'','','')} tooltip="Add New Question" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <Add style={iconStyles}/>
              </IconButton>
          </Col>
  </Card>);
}

else if(this.state.questType==11){

questions.pop();
   questions.push( <Card>
            <CardHeader>
                <SelectType getQuestionType={this.onChangeQuestType.bind(this)}  />
            </CardHeader>

            <Divider />

             <CardText>
               <DateRange type={this.getType.bind(this)} question={this.onChangeQuest.bind(this)}/>
            </CardText>

           <Col offset={3}>
              <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <DuplicateButton style={iconStyles}/>
              </IconButton>
              <IconButton  tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                     <CloseButton style={iconStyles}/>
              </IconButton>
              <IconButton onClick={this.addNewQuestion.bind(this,this.state.questionQ,this.state.type,'','','')} tooltip="Add New Question" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <Add style={iconStyles}/>
              </IconButton>
          </Col>
  </Card>);
}
else if(this.state.questType==12){

questions.pop();
   questions.push( <Card>
            <CardHeader>
                <SelectType getQuestionType={this.onChangeQuestType.bind(this)}  />
            </CardHeader>

            <Divider />

             <CardText>
               <NumberChoice scale={this. onChangeNumberScale.bind(this)} type={this.getType.bind(this)} question={this.onChangeQuest.bind(this)}/>
            </CardText>

           <Col offset={3}>
              <IconButton tooltip="Duplicate" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <DuplicateButton style={iconStyles}/>
              </IconButton>
              <IconButton  tooltip="Delete" touch={true} tooltipPosition="bottom-right"style={{marginRight:'4%'}}>
                     <CloseButton style={iconStyles}/>
              </IconButton>
              <IconButton onClick={this.addNewQuestion.bind(this,this.state.questionQ,this.state.type,'',this.state.numberScale,'')} tooltip="Add New Question" touch={true} tooltipPosition="bottom-right" style={{marginRight:'4%'}}>
                     <Add style={iconStyles}/>
              </IconButton>
          </Col>
  </Card>);
}

      var finalTemplete=[];
      finalTemplete.push(this.state.fullTemplate.map((fullQuestions,i)=>{
        console.log("Full Data");
        console.log(fullQuestions)

        return(
           <Card >
               <CardText>
                  <h3 style={{marginTop:'3%',marginLeft:'3%',marginBottom:'3%',color:'#000000',textAlign:'left'}}>{i+1}:{fullQuestions.questionQ}</h3>
                  {fullQuestions.questiontype}

               </CardText>

         </Card>)
            }));

      }




  return(
    <Grid>
    <Row center='xs'>
    <Col xs={12}>
     <Paper  style={style}>


       <Card style={welcomeStyle}
              onClick={this.onMouseOverWelcome}
              onMouseOut={this.onMouseOut}
              zDepth={this.state.welShadow}>
        <CardText style={{background:'#0b0c66'}}>
         {welcomeTitle}
         </CardText>
         </Card>

            <DisplayArea/>
            {questions}


       <Card style={thanksStyle}
              onClick={this.onMouseOverthanks}
              zDepth={this.state.thanksShadow}
       >
       <CardText style={{background:'#0b0c66'}}>
           {thanksMessage}
           </CardText>
       </Card>
     </Paper>
    </Col>
    </Row>
    </Grid>
 );
}
}

export default NewTemplate;
