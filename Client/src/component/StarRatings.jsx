import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import {IndexLink, Link} from 'react-router';
import { Grid,Col,Row} from 'react-flexbox-grid';
import {blueGrey500,white} from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import SelectType from './SelectType';
import request from 'superagent';

const cardheadstyle={
  background:"#242323",
  textAlign:'center',
}

const style = {
marginTop:30
};

class StarRatings extends Component
{
  state = {
    quest:"",
    disable:true,
    value: 0,
    listOptions:[],
    addValue: false,
    starValues:[],
    defaultValue:[]
  };

  handleChange = (event, index, value) => {
    var list=[];
    var text=[];
    var defaultValue=[];
    var starValue= Array(value).fill(" ");
    for(let i=0;i<value;){
      defaultValue.push(++i);
    }

    this.setState({value:null});
    this.props.scale(value);

    this.setState({defaultValue:defaultValue,value:value,starValues:starValue});
    if(value===0||this.state.quest.length<5)
    {
      this.setState({
        disable:true
      })
    }
    else
    {
      this.setState({
        disable:false
      })
    }
    this.props.options(starValue);
    if(this.state.addValue)
    {
      for (let i = 1; i <=value; i++ )
      {
        text=[];
        var star=i+" Star";
        text.push(<TextField hintText={star} underlineStyle={{borderColor:blueGrey500}} id={i} onChange={this.changeStarValue.bind(this)}/>);
        list.push(<ListItem primaryText={text}/>);
        this.props.options(starValue);
      }
      this.setState({
        listOptions:list
      })
    }
    this.props.scale(value);
  }
  onChangeCheck=(e)=>
  {
    if(!e.target.checked)
    {
      this.setState({
        listOptions:[],
        addValue:false,
      });
        this.props.options(this.state.starValues);
    }
    else
    {
      var list=[];
      var text=[];
      var value=this.state.value;
      var starValue= Array(value).fill(" ");

      for (let i = 1; i <=value; i++ )
      {
        text=[];
        var star=i+" Star";
        text.push(<TextField hintText={star} underlineStyle={{borderColor:blueGrey500}} id={i} onChange={this.changeStarValue.bind(this)}/>);
        list.push(<ListItem primaryText={text}/>);
        this.props.options(starValue);
      }
      this.setState({
        addValue:true,
        listOptions:list,
        starValues:starValue
      })
    }
  };
  changeStarValue(e)
  {
    var starValue=this.state.starValues;
    starValue[e.target.id-1]=e.target.value;
    console.log("Star value",starValue);
    this.setState({
      starValues:starValue
    })
    this.props.scale()
    this.props.options(starValue);
  }
  questionChange(e)
  {
    if(this.state.value===0||e.target.value.length<5)
    {
      this.setState({
        disable:true
      })
    }
    else
    {
      this.setState({
        disable:false
      })
    }
    this.setState({
      quest:e.target.value
    })
    this.props.getQuestion(e.target.value);
    this.props.type("StarRatings");
  }

  updateDb(){
    if(this.state.addValue){
  var questionScreen={
    sName:localStorage.getItem('sName'),
    type:'starrate',
    questions:
      {
        questionType:'StarRatings',
        questionQ:this.state.quest,
        scale:this.state.value,
        options:this.state.starValues
      }

  }}else {
    var sName=localStorage.getItem('sName');
    var questionScreen={
      sName:localStorage.getItem('sName'),
      type:'starrate',
      questions:
        {
          questionType:'StarRatings',
          questionQ:this.state.quest,
          scale:this.state.value,
          options:this.state.defaultValue
        }


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

  render()
  {
    var url="Home/AddQuestion/"+localStorage.getItem("sName");
    const items = [];
    for (let i = 3; i <= 10; i++ ) {
      items.push(<MenuItem value={i} key={i} primaryText={`${i}`} />);
    }

    return(
        <form >
            <Paper>
        <Card style={{background:' #E5E4E2 '}}>
          <CardHeader title="Create Star Rate Questions"  style={cardheadstyle} titleColor='white' titleStyle={{fontWeight:'bold'}}/>
          <CardText style={{background:"#E5E4E2"}}>
          <Subheader style={{fontSize:'125%',color:'#1C6D03 '}}>Select the question type</Subheader>
            <SelectType/>
              <br /><br />
              <Subheader style={{fontSize:'125%',color:'#1C6D03 '}}>Enter the question</Subheader>
               <TextField
                value={this.state.quest}
                underlineStyle={{borderColor:blueGrey500}}
                onChange={this.questionChange.bind(this)}
                multiLine={true}
                required
                /><br />
              <Divider style={{background:blueGrey500}}/>
              <Subheader style={{color:'#1C6D03 '}}>Select Scale</Subheader>
            <SelectField
              floatingLabelText="Select Scale"
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
              maxHeight={200}
              underlineStyle={{borderColor:blueGrey500}} required>
              {items}
            </SelectField>
            <Checkbox label="Add Rating Value" iconStyle={{borderColor:blueGrey500}} labelStyle={{marginRight:1000,color:blueGrey500}} checked={this.state.addValue} onCheck={this.onChangeCheck.bind(this)}/>

            <List>
            {this.state.listOptions}
            </List>
            <br />
          </CardText>
          <Divider style={{background:blueGrey500}}/>
          <CardActions >
            <Link to={url} activeClassName="active">
          <RaisedButton label="Cancel" labelStyle={{fontWeight:'bold'}} />
          </Link>
            <Link to={url} activeClassName="active">
          <RaisedButton label="Submit" backgroundColor='#1C6D03 ' disabled={this.state.disable} onClick={this.updateDb.bind(this)} labelStyle={{color:'#FFFFFF ',fontWeight:'bold'}} />
            </Link>

          </CardActions>
        </Card>
        </Paper>
        </form>

      );
  }
}

export default StarRatings;
