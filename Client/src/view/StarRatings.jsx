import React, { Component } from 'react';
import StarRatings from '../component/StarRatings';
import TempDisplay from '../component/TempDisplay';
import { Grid,Row,Col } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
class StarRatingsEdit extends Component {
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

  onChangeScale(value)
  {
    this.setState({
      scale:value
    })
  }
 render() {

   return (
            <Dialog  autoScrollBodyContent={true} open={this.state.open} modal={true} contentStyle={{width:'100%',maxWidth:'100%'}}>
            <Grid>
              <Row>
                <Col xs={12} sm={4}>
                  <StarRatings getQuestion={this.onChangeQuest.bind(this)} scale={this.onChangeScale.bind(this)} options={this.onChangeOptions.bind(this)} type={this.getType.bind(this)}/>
                </Col>
                <Col xs={12} sm={8}>
                  <TempDisplay putQuestion={this.state.quest} putOptions={this.state.options} putScale={this.state.scale} putType={this.state.type}/>
                </Col>
              </Row>
            </Grid>
          </Dialog>
        
   );
 }
}

export default StarRatingsEdit;
