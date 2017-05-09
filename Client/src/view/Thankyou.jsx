import React, { Component } from 'react';
import Thankyou from '../component/Thankyou';
import TempDisplay from '../component/TempDisplay';
import { Grid,Row,Col } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
class ThankyouEdit extends Component {
  constructor(props) {
   super(props);
   this.state = {open: true};
  }

   onChangeThanks(msg)
  {
    this.setState({
      msg:msg
    })
  }

  onChangeName(name)
  {

    this.setState({
      name:name
    })

  }
  onChangeContact(contact)
  {

    this.setState({
      contact:contact
    })

  }
  onChangeEmail(mail)
  {

    this.setState({
      mail:mail
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
                  <Thankyou getThanks={this.onChangeThanks.bind(this)} getName={this.onChangeName.bind(this)} getContact={this.onChangeContact.bind(this)} getEmail={this.onChangeEmail.bind(this)} type={this.getType.bind(this)} />
                </Col>
                <Col xs={12} sm={7.5}>
                  <TempDisplay  putThanks={this.state.msg} putName={this.state.name} putContact={this.state.contact} putEmail={this.state.mail} putType={this.state.type} />
                </Col>
              </Row>
            </Grid>
          </Dialog>
        </div>
   );
 }
}

export default ThankyouEdit;
