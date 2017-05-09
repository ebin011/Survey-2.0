import React, { Component } from 'react';
import Dropdown from '../component/Dropdown';
import TempDisplay from '../component/TempDisplay';
import { Grid,Row,Col } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
class DropdownEdit extends Component {
  constructor(props) {
   super(props);
   this.state = {open: true,
   quest:" ",
    options:[],
    type:" "};
  }
  getType(type)
  {

    this.setState({
      type:type
    })
  }
  onChangeQuest(quest)
  {
    this.setState({
      quest:quest
    })
  }
  onChangeOptions(options)
  {
    this.setState({
      options:options
    })
  }
 render() {

   return (
            <Dialog autoScrollBodyContent={true} open={this.state.open} contentStyle={{height:'100%',width:'100%',maxHeight:'none',maxWidth: 'none'}}>
            <Grid>
              <Row style={{height:'40%'}}>
                <Col xs={12} sm={5}>
                  <Dropdown type={this.getType.bind(this)} question={this.onChangeQuest.bind(this)} options={this.onChangeOptions.bind(this)}/>
                </Col>
                <Col xs={12} sm={7}>
                  <TempDisplay putQuestion={this.state.quest} putOptions={this.state.options} putType={this.state.type}/>
                </Col>
              </Row>
            </Grid>
          </Dialog>
        
   );
 }
}

export default DropdownEdit;
