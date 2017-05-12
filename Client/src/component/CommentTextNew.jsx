import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import {blueGrey500} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import { Grid,Col,Row} from 'react-flexbox-grid';
import Textarea from 'react-textarea-autosize';
 
const floatStyle={
 margin:10
}
class SingleTextNew extends Component {

   constructor() {
    super();
   this.state = {
      quest:'',
      disable:true,
     optionArr: [' '],
        
   }
 }

 componentWillMount(){
    this.props.type("CommentText");
 }
 
questionChange(e){
  this.setState({
     quest:e.target.value,
   })
   this.props.question(e.target.value);
}
 
 render()
 {
  var components=[];
  
  components.push(<div>
                      
                     <Textarea
                           useCacheForDOMMeasurements
                           placeholder="Your Comments Here in less than 500 words"
                           hintStyle={{fontWeight:'bold'}}
                           underlineStyle={{borderColor:'#37861E '}}
                           minRows={5}
                           style={{width:'80%',marginLeft:'1%',marginTop:'4%'}}
                           multiLine={true} 
                     />
                  </div>);
 

    
   return(<div>
     
      
                {components}
                
   </div>);
 }
}

export default SingleTextNew;
