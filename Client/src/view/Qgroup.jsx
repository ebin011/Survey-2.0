import React, { Component } from 'react';
import Qgroup from '../component/Qgroup';
import TempDisplay from '../component/TempDisplay';
import { Grid,Row,Col } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
class QgroupEdit extends Component {
  constructor(props) {
   super(props);
   this.state =
   {
    open: true,
    quest:'',
   questComments:'',
   questYesOrNo:'',
    type:'',
    options:[]
   };
 }
onChangeOptions(options){
  this.setState({
    options:options
  })
}
onCommentsChangeQuest(questComments)
  {
    this.setState({
      questComments:questComments
    })
  }
  onYesOrNoChangeQuest(questYesOrNo)
  {
    this.setState({
      questYesOrNo:questYesOrNo
    })
  }
  onCommentsChangeQuest1(questComments1)
    {
      this.setState({
        questComments1:questComments1
      })
    }
    onYesOrNoChangeQuest1(questYesOrNo1)
    {
      this.setState({
        questYesOrNo1:questYesOrNo1
      })
    }
getType(type){
  this.setState({
    type:type
  })
}
onQuestionChange(quest){
  this.setState({
    quest:quest
  })
}
 render() {

   return (<div >
            <Dialog autoScrollBodyContent={true} open={this.state.open} contentStyle={{height:'100%',width:'100%',maxHeight:'none',maxWidth: 'none'}}>
            <Grid>
              <Row style={{height:'40%'}}>
                <Col xs={12} sm={4.5}>
                  <Qgroup getQuestion={this.onQuestionChange.bind(this)} getCommentsQuestion={this.onCommentsChangeQuest.bind(this)} getYesOrNo={this.onYesOrNoChangeQuest.bind(this)} getCommentsQuestion1={this.onCommentsChangeQuest1.bind(this)} getYesOrNo1={this.onYesOrNoChangeQuest1.bind(this)} options={this.onChangeOptions.bind(this)} type={this.getType.bind(this)} />
                </Col>
                <Col xs={12} sm={7.5}>
                  <TempDisplay putQuestion={this.state.quest} putOptions={this.state.options} putComments={this.state.questComments} putYesOrNo={this.state.questYesOrNo} putComments1={this.state.questComments1} putYesOrNo1={this.state.questYesOrNo1} putType={this.state.type}/>
                </Col>
              </Row>
            </Grid>
          </Dialog>
        </div>
   );
 }
}

export default QgroupEdit;
