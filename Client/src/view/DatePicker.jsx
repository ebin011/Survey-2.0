import React, { Component } from 'react';
import DatePicker from '../component/DatePicker';
import TempDisplay from '../component/TempDisplay';
import { Grid,Row,Col } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
class SingleTextEdit extends Component {
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

   return (<div >
            <Dialog autoScrollBodyContent={true} open={this.state.open} contentStyle={{height:'100%',width:'100%',maxHeight:'none',maxWidth: 'none'}}>
            <Grid>
              <Row style={{height:'40%'}}>
                <Col xs={12} sm={4.5}>
                  <DatePicker getQuestion={this.onChangeQuest.bind(this)}  type={this.getType.bind(this)} />
                </Col>
                <Col xs={12} sm={7.5}>
                  <TempDisplay putQuestion={this.state.quest} putType={this.state.type} />
                </Col>
              </Row>
            </Grid>
          </Dialog>
        </div>
   );
 }
}

export default SingleTextEdit;
