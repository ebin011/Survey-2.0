import React, { Component } from 'react';
import Slider from '../component/Slider';
import TempDisplay from '../component/TempDisplay';
import { Grid,Row,Col } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
class SliderEdit extends Component {
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

  onChangeMin(minValue)
  {
    this.setState({
      minValue:minValue
    });

  }

   onChangeMax(maxValue)
  {
    this.setState({
      maxValue:maxValue
    });

  }
   onChangeScale(scaleValue)
  {
    this.setState({
      scaleValue:scaleValue
    });

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
                  <Slider getQuestion={this.onChangeQuest.bind(this)} getMinValue={this.onChangeMin.bind(this)} getMaxValue={this.onChangeMax.bind(this)} getScale={this.onChangeScale.bind(this)} type={this.getType.bind(this)} />
                </Col>
                <Col xs={12} sm={7.5}>
                  <TempDisplay putQuestion={this.state.quest}  putMaxValue={this.state.maxValue} putScaleValue={this.state.scaleValue} putType={this.state.type}/>
                </Col>
              </Row>
            </Grid>
          </Dialog>
        </div>
   );
 }
}

export default SliderEdit;
