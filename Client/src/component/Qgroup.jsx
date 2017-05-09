import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {IndexLink, Link} from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Qoption from '../component/Qoption';
import { Grid,Row,Col } from 'react-flexbox-grid';
import SelectType from './SelectType';

const styles={
  block: {
    maxWidth: 250,
  },

  checkbox: {
    marginBottom: 16,
  },

  check: {
    marginLeft: 20,
  },
};

const stylepap={

height: 'auto',

marginLeft: '20px',
width: 440,
height: 250,
padding: 0,
paddingBottom: 10,
textAlign: 'center',
display: 'inline-block',

};


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
class Qgroup extends Component{

    constructor() {
    super();
    this.state = {
        showQuery: 0,
        showiQuery: 0,
          checked:false,
          checked1: false,
        quest:'',
        status:true,
        submit:true,
        disable:true
    }
    this.checkYes = this.checkYes.bind(this);
    this.checkNo = this.checkNo.bind(this);
  }

  componentWillMount() {
    this.props.type('Qgroup');
  }
getCommentsvalue(comment){
  this.props.getCommentsQuestion(comment);
}
getCommentsvalue1(comment1){
  this.props.getCommentsQuestion1(comment1);
}
getYesOrNovalue(yes){
  this.props.getYesOrNo(yes);
}
getYesOrNovalue1(no){
  this.props.getYesOrNo1(no);
}
  questionChange(e){
    if(e.target.value.length>=5)
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
    this.props.options([]);
    this.setState(
    {
      quest:e.target.value,
    })
    if(this.state.quest.length>=5){
      this.setState({
        status:false,
        submit:false
      })
    }
    else{
      this.setState({
        status:true
      })
    }
    this.props.getQuestion(e.target.value);
  }

checkYes() {
       this.setState({showQuery: 1,
         checked: !this.state.checked});
   };

checkNo()
 {
  this.setState({showiQuery: 1,
         checked1: !this.state.checked1});

 };
    render(){
    var url="Home/AddQuestion/"+localStorage.getItem("sName");
    let showNo = '';
    let showYes = '';

    if(this.state.quest && this.state.showiQuery == 1 && this.state.checked1==true)
      {
      showNo=<Row>
               <Qoption getCommentsQuestion={this.getCommentsvalue1.bind(this)} getYesOrNoQuestion={this.getYesOrNovalue1.bind(this)}/>
        </Row>
      }

    if(this.state.quest && this.state.showQuery == 1 && this.state.checked==true)
    {
      showYes=<Row>
               <Qoption getCommentsQuestion={this.getCommentsvalue.bind(this)} getYesOrNoQuestion={this.getYesOrNovalue.bind(this)}/>
          </Row>
    }
        return(

     <Paper style={{height:'100%'}} >
     <Card style={{background:'#E5E4E2',height:'100%'}}>
       <CardHeader title="Question Group" style={cardheadstyle} titleStyle={cardTitleStyle}/>

       <CardText style={{marginTop:0}}>

       <Subheader style={{fontSize:'125%',color:'#1C6D03 '}}> Question Type </Subheader>
       <SelectType/>



       </CardText>
       <Divider style={{background:'#000000'}}/>
         <CardActions style={{marginTop:'0px',marginLeft:'1%'}}>
          <Subheader style={{fontSize:'125%',color:'#1C6D03 ',marginTop:'3%'}}>Question</Subheader>
         <TextField
           hintText="Enter your Question here."
           hintStyle={{fontWeight:'bold'}}
           underlineStyle={{borderColor:'#37861E'}}
           fullWidth={true}
           value={this.state.quest}
           onChange={this.questionChange.bind(this)}
         />


       <h4>your question here</h4>


      <Checkbox
      label="Yes"
      style={styles.checkbox}
      value="checked"
      disabled={this.state.status}
      checked={this.state.checked}
      onCheck={this.checkYes}
      />
      <Col xs={12}>
      {showYes}
      </Col>
      <Checkbox
        label="No"
        style={styles.checkbox}
        value1="checked"
        disabled={this.state.status}
        checked1={this.state.checked1}
        onCheck={this.checkNo}
      />
          <Col xs={12}>
       {showNo}
       </Col>


        </CardActions>

        <Divider style={{background:'#000000'}}/>
       <CardActions style={{marginTop:'0px',marginLeft:'1%'}}>
       <Link to={url} activeClassName="active">
         <RaisedButton label="Cancel" labelStyle={{fontWeight:'bold'}} />
         </Link>
        <Link to={url} activeClassName="active">
         <RaisedButton label="Submit" backgroundColor='#1C6D03 'disabled={this.state.submit} labelStyle={{color:'#FFFFFF ',fontWeight:'bold'}} />
        </Link>
       </CardActions>

     </Card>
     </Paper>
        );
    }
}
export default Qgroup;
