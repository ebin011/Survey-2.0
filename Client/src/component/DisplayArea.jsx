/* eslint-disable */
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
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ReactStars from 'react-stars';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import NewTemplate from './newTemplate'

var val=0;
var tempArray=[];

const floatStyle={
 margin:10
}
class DisplayArea extends Component {

   constructor(props) {
    super(props);
   this.state = {

      questionArray:[]

   }
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

  handleChildClick(event) {

     alert("The Child button text is: ");


  }

 componentWillMount(){

 }




 render()
 {
   var finalTemplete=[];
   const { values } = this.props;

 <NewTemplate tempArr={this.questionsFunction.bind(this)}  />


      finalTemplete.push(this.state.questionArray.map((fullQuestions,i)=>{
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

   return(<div>


                {finalTemplete}

   </div>);
 }
}

export default DisplayArea;
