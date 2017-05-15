import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import request from 'superagent';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Slider from 'material-ui/Slider';
import StarRating from 'star-rating-react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {Grid,Col,Row} from 'react-flexbox-grid';
import image from '../../images/welcome.png';
import Request from 'superagent';

class TakeSurvey extends React.Component {

  state = {
    loading: false,
    finished: false,
    stepIndex: 0,
    allData:''
  };
  componentWillMount()
  {


    Request.get('http://10.201.174.176:9080/api/getDetails').end((err,res)=>{

      this.setState({
        allData:res.body[0]
      })
    });
  }
  dummyAsync = (cb) => {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1
      }));
    }
    var options=this.state.commentValue;
    //options.push(this.state.commentValue);
    var data={surveyName:localStorage.getItem('sName'),options:this.state.commentValue}


        request.put('http://10.201.174.176:9080/api/answerSurvey')


                .set('Content-Type', 'application/json')
                .send(data)
                 .then((err,res)=>
                 {
                   console.log("posted");
                 });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
      }));
    }
  };

    valueChanged=(qstn,newValue) =>  {
        this.setState({starRating:newValue})
      var a=this.state.commentValue;
      a.pop();
      a.pop();
      a.push(qstn);
      a.push(newValue);
      this.setState({commentValue:a});

    }
    dropValueChanged=(qstn,e,i,newValue) =>  {
      var a=this.state.commentValue;
      a.pop();
      a.pop();
      a.push(qstn);
      a.push(newValue);
      this.setState({commentValue:a});
      console.log("comment value set",a)
    }
    singleTextValueChanged=(qstn,e,newValue) =>  {
      var a=this.state.commentValue;
      a.pop();
      a.pop();
      a.push(qstn);
      a.push(newValue);
      this.setState({commentValue:a});
      console.log("comment value set",a)
    }

    commentsValueChanged=(qstn,e,newValue) =>  {
      var a=this.state.commentValue;
      a.pop();
      a.pop();
      a.push(qstn);
      a.push(newValue);
      this.setState({commentValue:a});
      console.log("comment value set",qstn, this.state.commentValue)
    }
    multiChoiceValueChange=(qstn,e,newValue)=>{
      var a=this.state.commentValue;
      a.pop();
      a.pop();
      a.push(qstn);
      a.push(newValue);
      this.setState({commentValue:a});
    }
    yesOrNoValueChange=(qstn,e,newValue)=>{
      var a=this.state.commentValue;
      a.pop();
      a.pop();
      a.push(qstn);
      a.push(newValue);
      this.setState({commentValue:a});
    }
    checkboxValueChange=(e,i,value) =>  {
      var a=this.state.checkboxValue;
      console.log("index value set", value)
      if(value){
      a.push(e)
      this.setState({checkboxValue:a});
      console.log("checkbox value set", a)}

      else
      {
        var x= a.indexOf(e)
        a.splice(x,1);
      this.setState({checkboxValue:a});
      console.log("checkbox value unsetset", a)}
    }

      handleSlider = (quest,event, value) => {
        var a=this.state.commentValue;
        a.pop();
        a.pop();
        a.push(quest);
        a.push(value);
        this.setState({commentValue:a});
        this.setState({sliderChange:value});
        console.log(this.state.sliderChange,a);

      };
  getStepContent(stepIndex) {

    if(this.state.allData.questions)
    {
    var data=this.state.allData.questions;
    var length=data.length;
    console.log("data",data);
    if(stepIndex==0)
    {
      return (
        <div>
          <Grid>
            <Row center="xs">
              <Paper style={{background:'#90EE90',width:'100%',height:'100%',padding:20,margin:20}} zDepth={1}>
                <Row center="xs">
                  <Col xs={6}>
                    <h2 style={{color:"#FFFFFF"}}>Hi there...</h2>
                    <p>{this.state.allData.welcomeMsg}</p>
                  </Col>
                  <Col xs={6}>
                    <img src="" />
                  </Col>
                </Row>
              </Paper>
            </Row>

            <div style={{marginTop: 24, marginBottom: 12}}>
              <FlatButton
                label="Back"
                disabled={stepIndex === 0}
                onTouchTap={this.handlePrev}
                style={{marginRight: 12}}
              />
              <RaisedButton
                label={'Next'}
                primary={true}
                onTouchTap={this.handleNext}
              />
            </div>
          </Grid>
        </div>
      );
    }
    else if (stepIndex===data.length+1) {
      return (
        <div>
          <Grid>
            <Row center="xs">
              <Paper style={{background:'#90EE90',width:'100%',height:'100%',padding:20,margin:20}} zDepth={1}>
                <Row center="xs">
                  <Col xs={12}>
                    <h1>{this.state.allData.thanksmessage}</h1>
                  </Col>
                </Row>
              </Paper>
            </Row>
            <div style={{marginTop: 24, marginBottom: 12}}>
              <FlatButton
                label="Back"
                disabled={stepIndex === 0}
                onTouchTap={this.handlePrev}
                style={{marginRight: 12}}
              />
              <RaisedButton
                label={'Finish'}
                primary={true}
                onTouchTap={this.handleNext}
              />
            </div>
          </Grid>
        </div>
      );
    }
    else {
        return(data.map((obj,i)=>{
          if(stepIndex==i+1){
            if(obj.questionType=="Comments"){
        return(<div>
          <h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{i+1}.{obj.questionQ}</h3>

          <TextField
          hintText="Your Option Here"
          hintStyle={{fontWeight:'bold'}}
          underlineStyle={{borderColor:'#37861E '}}
          onChange={this.commentsValueChanged.bind(this,obj.questionQ)}
          />
          <RaisedButton
                label={'Next'}
                primary={true}
                onTouchTap={this.handleNext}
              />
          </div>);
      }
      else if(obj.questionType=="Checkbox"){
         var options=[];
          obj.options.map((option)=>{
          options.push(<div>
             <Checkbox label={option} onCheck={this.checkboxValueChange.bind(this,option)} iconStyle={{marginLeft:'35%'}} labelStyle={{marginRight:'50%',color:'#000000',marginLeft:'2%'}}/>
             </div>);
           });
         return(<div>
         <h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{i+1}.{obj.questionQ} </h3>
         {options}
         <RaisedButton
                label={'Next'}
                primary={true}
                onTouchTap={this.handleNext}
              />
         </div>);
       }
else if(obj.questionType=="Dropdown"){
var options=[];
obj.options.map((option)=>{
options.push(
    <MenuItem value={option} primaryText={option} iconStyle={{marginLeft:'35%'}}/>
  );


});

return(<div>
<h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{i+1}.{obj.questionQ} </h3>

<DropDownMenu onChange={this.dropValueChanged.bind(this,obj.questionQ)} value={this.state.dropDown} labelStyle={{marginRight:'50%',color:'#000000',marginLeft:'2%'}}>
{options}
</DropDownMenu>
<RaisedButton
                label={'Next'}
                primary={true}
                onTouchTap={this.handleNext}
              />
</div>);
}
else if(obj.questionType=="StarRatings"){
var options=[];
options.push(
 <StarRating
  size={obj.options.length}
  value={this.state.starRating}
  onChange={this.valueChanged.bind(this,obj.questionQ)}
  />
);

return(<div>
<h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{i+1}.{obj.questionQ} </h3>

{options}
<RaisedButton
                label={'Next'}
                primary={true}
                onTouchTap={this.handleNext}
              />
</div>);
}
else if(obj.questionType=="SingleText"){

return(<div>
<h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{i+1}.{obj.questionQ} </h3>

<TextField
hintText="Your Answer Here"
hintStyle={{fontWeight:'bold'}}
underlineStyle={{borderColor:'#37861E '}}
onChange={this.singleTextValueChanged.bind(this,obj.questionQ)}
/>
<RaisedButton
                label={'Next'}
                primary={true}
                onTouchTap={this.handleNext}
              />
</div>);
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

return(<div>
<h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{i+1}.{obj.questionQ} </h3>

<RadioButtonGroup onChange={this.multiChoiceValueChange.bind(this,obj.questionQ)} name="YesOrNo" style={{textAlign:'left',marginLeft:'5%',marginTop:'2%'}} >
{options}
</RadioButtonGroup>
<RaisedButton
                label={'Next'}
                primary={true}
                onTouchTap={this.handleNext}
              />
</div>);
}
else if(obj.questionType=="Slider"){


return(<div>
<h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{i+1}.{obj.questionQ} </h3>

<Slider
   min={0}
   max={obj.maxValue}
   step={obj.scale}
   defaultValue={0}
   value={this.state.sliderChange}
   onChange={this.handleSlider.bind(this,obj.questionQ)}
   style={{marginLeft:'4%',marginRight:'4%'}}
 />

           <span style={{fontWeight:'bold'}}>{this.state.sliderChange}</span>
           <span style={{fontWeight:'bold'}}>{'/'}</span> <span style={{fontWeight:'bold'}}>{obj.maxValue}</span>
           <RaisedButton
                           label={'Next'}
                           primary={true}
                           onTouchTap={this.handleNext}
                         />
</div>);
}
else if(obj.questionType=="YesOrNo"){


return(<div>
<h3 style={{marginTop:0,marginLeft:'2%',marginBottom:0,color:'#000000',textAlign:'left'}}>{i+1}.{obj.questionQ} </h3>

<RadioButtonGroup name="YesOrNo" onChange={this.yesOrNoValueChange.bind(this,obj.questionQ)}style={{textAlign:'left',marginLeft:'5%',marginTop:'2%'}} >

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
<RaisedButton
                label={'Next'}
                primary={true}
                onTouchTap={this.handleNext}
              />
</div>);
}
          }
        }));
      }
    }
  }

  renderContent() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px', overflow: 'hidden'};


    return (
      <div style={contentStyle}>
        <div>{this.getStepContent(stepIndex)}</div>
      </div>
    );
  }

  render() {
    const {loading, stepIndex} = this.state;

    return (
      <div style={{width: '100%', marginTop:'50'}}>
      <Paper>
        <ExpandTransition loading={loading} open={true}>
          {this.renderContent()}
        </ExpandTransition>
        </Paper>
      </div>
    );
  }
}

export default TakeSurvey;
