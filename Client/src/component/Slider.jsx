import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {IndexLink, Link} from 'react-router';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import SelectType from './SelectType';
import request from 'superagent';
const cardheadstyle={
 background:'#242323',
 textAlign:'center'
}
const cardTitleStyle={
   color:'#FFFFFF',
   fontSize:'125%',
   fontWeight:'bold'
}
const buttonStye={
  marginLeft:30,
}
class Slider extends Component{
  constructor(props) {
   super(props);
   this.state = {value: 4,
   maximum:0,
    scale:0,
    disable:true,
  quest:' '};
 }

componentWillMount(){
  this.props.type("Slider");
  }

handleQuestion(e) {
    if(e.target.value.length>=5&&(Number(this.state.maximum >= 5))&&(this.state.scale>0&&this.state.scale<this.state.maximum))
    {
      this.setState({
        disable:false
      })
    }
    else {
      this.setState({
        disable:true
      })
    }
    this.setState({
      quest:e.target.value
    })
    this.props.getQuestion(e.target.value);

    console.log("Sucess");
  }

handleMaxValue(e) {

  if(this.state.quest.length>=5&&(e.target.value >= 5 )&&(this.state.scale>0&&this.state.scale<e.target.value))
  {
    this.setState({
      disable:false
    })
  }
  else {
    this.setState({
      disable:true
    })
  }
  this.setState({
    maximum:e.target.value
  })
    this.props.getMaxValue(e.target.value);
    console.log("Sucess");
  }
handleScale(e) {
  if((this.state.quest.length>=5)&&(Number(this.state.maximum) >= 5)&&(e.target.value>0&&e.target.value<this.state.maximum))
  {
    this.setState({
      disable:false
    })
  }
  else {
    this.setState({
      disable:true
    })
  }
  this.setState({
    scale:e.target.value
  })
    this.props.getScale(e.target.value);
    console.log("Sucess");
  }
  updateDb(){
    var sName=localStorage.getItem('sName');
    var questionScreen={
      sName:localStorage.getItem('sName'),
      type:'slider',
      questions:
        {
          questionType:"Slider",
          questionQ:this.state.quest,
          maxValue:this.state.maximum,
          scale:this.state.scale
        }

    }


    request.post('http://10.201.174.176:9080/api/updateSurvey/'+sName)

            .set('Content-Type', 'application/json')
            .send(questionScreen)
             .end((err,res)=>
             {
               console.log("posted");
              })
  }
	render(){
    var url="Home/AddQuestion/"+localStorage.getItem("sName");
		return(<div><Paper >
      <Card style={{background:'#E5E4E2'}}>
        <CardHeader title="Slider" style={cardheadstyle} titleStyle={cardTitleStyle}/>
        <CardText >
        <SelectType/>
          </CardText>
          <Divider style={{background:'#000000'}}/>
          <CardActions>
          <Subheader style={{fontSize:'125%',color:'#1C6D03',marginTop:'3%'}}>Question</Subheader><br />
          <TextField
            floatingLabelText="Question"
            hintText="Enter Your Question Here"
            hintStyle={{fontWeight:'bold'}}
            required
            underlineStyle={{borderColor:'#37861E'}}
            onChange={this.handleQuestion.bind(this)}
            fullWidth={true}
          />
          </CardActions>
					<Divider style={{background:'#000000'}}/>
					<CardActions>
					<Subheader style={{fontSize:'125%',color:'#1C6D03',marginTop:'3%'}}>Scale Range</Subheader><br />

          <TextField
            floatingLabelText="MaxValue"
            hintText="Max Side Value"
            hintStyle={{fontWeight:'bold'}}
            required
            min='10'
            underlineStyle={{borderColor:'#37861E'}}
            onChange={this.handleMaxValue.bind(this)}
          /><br />
					<TextField
             floatingLabelText="Scale"
            hintText="Scale"
            hintStyle={{fontWeight:'bold'}}
            required
            underlineStyle={{borderColor:'#37861E'}}
            onChange={this.handleScale.bind(this)}
          /><br />
          </CardActions>
          <Divider style={{background:'#000000'}}/>
          <CardActions >
            <Link to={url} activeClassName="active">
              <RaisedButton label="Cancel" labelStyle={{fontWeight:'bold'}} />
              </Link>
             <Link to={url} activeClassName="active">
              <RaisedButton label="Submit" backgroundColor='#1C6D03' disabled={this.state.disable} onClick={this.updateDb.bind(this)} labelStyle={{color:'#FFFFFF ',fontWeight:'bold'}} />

             </Link>
          </CardActions>

      </Card>
      </Paper>
		</div>);
	}
 }
 export default Slider;
