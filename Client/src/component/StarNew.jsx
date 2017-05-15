import React, { Component } from 'react';
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
import request from 'superagent';


var val=0;

const floatStyle={
 margin:10
}
class StarRatingNew extends Component {

   constructor() {
    super();
   this.state = {

      quest:"",
      disable:true,
      value: 0,
      listOptions:[],
      addValue: false,
      starValues:[],
      defaultValue:[],

      starVal: 0,
      starComment:'',
      starColor:'#ffd700',
        
   }
 }

 componentWillMount(){
    if (this.props.getStarOptions) {
      this.props.getStarOptions(this.oldOption());
      console.log(this.props.index)
    }

    this.props.type("StarRating");
 }

 oldOption() {
    request.get('http://localhost:9080/api/getTempQuestions')

    .end((err,res) => {
      // if(res.body[i].questions[i].questionType=="MultiChoice"){
       
      //res.body.map((obj,i)=>{
        if(res.body[this.props.index].questions[this.props.index].questionType=="StarRating")
        {
        this.setState({
         value:res.body[this.props.index].questions[this.props.index].scale,
              });
        }
      //});
      
      if(err){console.log(err)}
        
    });
   
     console.log("Safe")
  }
 
questionChange(e){

  this.setState({quest:e.target.value })

   this.props.question(e.target.value);
}


 handleChange = (event, index, value) => {
   
   this.setState({value:value })

   this.props.scale(value);
  }
 

 ratingChanged = (newRating) => {
  console.log(newRating)
  
  this.setState({starVal:newRating})
 

  if(((newRating/(this.state.value))*100)<=20){
    this.setState({starColor:'#cb4335',starComment:'Bad' })

  }
  else if(((newRating/(this.state.value))*100)>20 && ((newRating/(this.state.value))*100)<=40 ){
    this.setState({starColor:'#e67e22',starComment:'Not Bad'})
  }
  else if(((newRating/(this.state.value))*100)>40 && ((newRating/(this.state.value))*100)<=60 ){
    this.setState({starColor:'#f1c40f',starComment:'Average'})
  }
  else if(((newRating/(this.state.value))*100)>60 && ((newRating/(this.state.value))*100)<=80 ){
    this.setState({starColor:'#28b463',starComment:'Very Good'})
  }
  else if(((newRating/(this.state.value))*100)>80 && ((newRating/(this.state.value))*100)<=100 ){
    this.setState({starColor:' #229954',starComment:'Excellent'})
  }

}

 render()
 {
  var components=[];
  var selOpt=[];
  var index=1;
  const items = [];

  for (let i = 3; i <= 10; i++ ) {

      items.push(<MenuItem value={i} key={i} primaryText={`${i}`} />);
    }
  

  components.push(<div>
            
            <SelectField
                  floatingLabelText="Select Scale"
                  hintText="Number of stars"
                  value={this.state.value}
                  onChange={this.handleChange.bind(this)}
                  maxHeight={200}
                  underlineStyle={{borderColor:blueGrey500}} required>
                  {items}
            </SelectField>
                  </div>);

  if(this.state.value)
      {

              val=val+1;
            console.log("here val"+val);
              if(val>=2)
                {
                  components.pop();
                  val=0;


      components.push( <Col xs={12} >

               

                <SelectField
                  floatingLabelText="Select Scale"
                  hintText="Number of stars"
                  value={this.state.value}
                  onChange={this.handleChange.bind(this)}
                  maxHeight={200}
                  underlineStyle={{borderColor:blueGrey500}} required>
                  {items}
                </SelectField>

                  <Col xs={8}>
                      <ReactStars
                          count={this.state.value}
                          onChange={this.ratingChanged}
                          value={this.state.starVal}
                          size={35}
                          color2={this.state.starColor}


                            />

                    </Col>  
                    
                    <Col xs={4}>      
                            <p style={{fontWeight:'bold',textAlign:'left',fontSize:'115%',marginLeft:'3%'}}>{this.state.starComment}</p>
                    </Col >

                 </Col> );


                }
                else{
                  components.push( <Col xs={12} >
                    <Col xs={8}>
                      <ReactStars
                          count={this.state.value}
                          onChange={this.ratingChanged}
                          value={this.state.starVal}
                          size={35}
                          color2={this.state.starColor}

                            />
                    </Col>
                    <Col xs={4}>
                            <p style={{fontWeight:'bold',textAlign:'left',fontSize:'115%',marginLeft:'3%'}}>{this.state.starComment}</p>
                    </Col>

                 </Col> );

                }


      }

    
   return(<div>
     
      
                {components}
                
   </div>);
 }
}

export default StarRatingNew;
