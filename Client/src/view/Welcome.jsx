import React, { Component } from 'react';
import Welcome from '../component/Welcome';
import TempDisplay from '../component/TempDisplay';
import { Grid,Row,Col } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
class WelcomeEdit extends Component {
  constructor(props) {
   super(props);
   this.state = {open: true};
  }

   onChangeWelcome(msg)
  {
    this.setState({
      msg:msg
    })
  }
  onChangeWelDes(desMsg)
  {

    this.setState({
      desMsg:desMsg
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
                  <Welcome getWelcome={this.onChangeWelcome.bind(this)} getWelDes={this.onChangeWelDes.bind(this)}  type={this.getType.bind(this)} />
                </Col>
                <Col xs={12} sm={7.5}>
                  <TempDisplay putWelMsg={this.state.msg} putWelDes={this.state.desMsg} putType={this.state.type}/>
                </Col>
              </Row>
            </Grid>
          </Dialog>
        </div>
   );
 }
}

export default WelcomeEdit;
