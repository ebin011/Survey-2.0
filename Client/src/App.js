import React, { Component } from 'react';
import SurveyBar from './component/SurveyBar';
import { Grid,Col,Row} from 'react-flexbox-grid';

class App extends Component{
  render() {
    return (
      <div className="App">
      <SurveyBar/>
      <Grid className="main" >
            {this.props.children}
        </Grid>
      </div>
    );
  }
}

export default App;
