import React, { Component } from 'react';
import Comments from '../component/Comments';
import TempDisplay from '../component/TempDisplay';
import { Grid,Row,Col } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
class CommentsEdit extends Component {
  constructor(props) {
   super(props);
   this.state = {open: true};
  }

  onChangeQuest(quest)
  {
    this.setState({
      quest:quest
    })
  }
  getType(type)
  {

    this.setState({
      type:type
    })
  }

 render() {


   return ( 
            <Dialog   open={this.state.open} contentStyle={{height:'100%',width:'100%',maxHeight:'none',maxWidth: 'none'}}>
           
              <Grid>
                <Row >
                <Col xs={5}>
                  <Comments getQuestion={this.onChangeQuest.bind(this)}  type={this.getType.bind(this)}/>
                </Col>
                <Col xs={7}>
                  <TempDisplay putQuestion={this.state.quest} putType={this.state.type} />
                </Col>
            </Row> 
        </Grid> 
           
          </Dialog>
      
   );
 }
}

export default CommentsEdit;
