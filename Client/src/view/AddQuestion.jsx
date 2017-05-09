import React, { Component } from 'react';
import Dragabble from '../component/Dragabble';
import Dropabble from '../component/Dropabble';
import { Grid,Row,Col } from 'react-flexbox-grid';

class AddQuestion  extends Component {
  constructor(){
    super();


  }
componentWillMount(){
  localStorage.setItem("sName", this.props.params.sName);
  console.log("localStorage",this.props.params.sName);

}
  render() {

    console.log("local :",localStorage.getItem('sName'),this.props.params.sName);
    return(
      <div>
        <Grid>
          <Row>
            <Col xs={12} style={{paddingTop:'5.5%'}} sm={4}>
              <Dragabble surveyName={this.props.params.sName}/>
            </Col>
            <Col xs={12} sm={8} style={{paddingTop:'5.5%'}}>
              <Dropabble />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default AddQuestion;
