import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import {blueGrey500} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import { Grid,Col,Row} from 'react-flexbox-grid';
 
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
    this.props.type("SingleText");
 }
 

 
 render()
 {
  var components=[];
  
  components.push(<div>
                      
                      <TextField
                          hintText="Your Answer Here"
                          hintStyle={{fontWeight:'bold'}}
                          underlineStyle={{borderColor:'#37861E '}}
                          style={{width:'60%',marginTop:'3%                                                                                                                                                                                                                                                                                                                                   '}}
                        />
                  </div>);
 

    
   return(<div>
     
      
                {components}
                
   </div>);
 }
}

export default SingleTextNew;
