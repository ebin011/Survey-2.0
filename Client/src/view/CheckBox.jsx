import React, { Component } from 'react';
import CheckBox from '../component/CheckBox';
import TempDisplay from '../component/TempDisplay';
import { Grid,Row,Col } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
class CheckBoxEdit extends Component {
  constructor(props) {
   super(props);
   this.state = {open: true,
     quest:" ",
      options:[],
      type:" "};
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
  onChangeOptions(options)
  {
    this.setState({
      options:options
    })
  }
 render() {

   return (<div style={{height:'100%'}}>
            <Dialog autoScrollBodyContent={true} open={this.state.open} contentStyle={{height:'100%',width:'100%',maxHeight:'none',maxWidth: 'none'}}>
            <Grid>
              <Row>
                <Col xs={12} sm={4.5}>
                  <CheckBox type={this.getType.bind(this)} question={this.onChangeQuest.bind(this)} options={this.onChangeOptions.bind(this)}/>
                </Col>
                <Col xs={12} sm={7.5}>
                  <TempDisplay putQuestion={this.state.quest} putOptions={this.state.options} putType={this.state.type}/>
                </Col>
              </Row>
            </Grid>
          </Dialog>
        </div>
   );
 }
}

export default CheckBoxEdit;
