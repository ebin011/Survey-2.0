import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import WelcomeEdit from './view/Welcome'
import ThankyouEdit from './view/Thankyou'
import CommentsEdit from './view/Comments';
import Login from './component/Login';
import CreateSurvey from './component/CreateSurvey';
import DisplayDetails from './component/DisplayDetails';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AddQuestion from './view/AddQuestion';
import DropdownEdit from './view/Dropdown';
import SliderEdit from './view/Slider';
import SingleTextEdit from './view/SingleText';
import MultiChoiceEdit from './view/MultiChoice';
import QgroupEdit from './view/Qgroup';
import CheckBoxEdit from './view/CheckBox';
import YesOrNoEdit from './view/YesOrNo';
import StarRatings from './view/StarRatings';
import DraftDisplay from './component/draftDisplay'
import Timer from './component/timer';
import TakeSurvey from './view/TakeSurvey';
import Preview from './component/SamplePreview';
import OutLink from './component/outLink'
import DatePicker from './view/DatePicker';
import DateRange from './view/DateRange';
import FullPreview from './component/FullPreview';

import UploadCSV from './component/uploadCSV';
import NewTemplate from './component/newTemplate';

injectTapEventPlugin();

ReactDOM.render(
 <MuiThemeProvider>
 <Router history={hashHistory}>
     <Route path="/" component={CreateSurvey}/>
     <Route path="/newTemplate/:sName" component={NewTemplate}/>
     <Route path="/Home" component={App}>
       <Route path="CreateSurvey" component={CreateSurvey}/>
       <Route path='Preview/:sName' component={Preview}/>
      <Route path='FullPreview/:sName' component={FullPreview}/>
       <Route path='AddQuestion/:sName' component={AddQuestion}/>
       <Route path='Welcome/:Wel' component={WelcomeEdit}/>
       <Route path='Details' component={DisplayDetails}/>
       <Route path='Comments/:sName' component={CommentsEdit}/>
       <Route path='Dropdown/:sName' component={DropdownEdit}/>
       <Route path='Slider/:sName' component={SliderEdit}/>
       <Route path='SingleText/:sName' component={SingleTextEdit}/>
       <Route path='MultiChoice/:sName' component={MultiChoiceEdit}/>
       <Route path='StarRatings/:sName' component={StarRatings}/>
       <Route path='Qgroup/:sName' component={QgroupEdit}/>
       <Route path='YesOrNo/:sName' component={YesOrNoEdit}/>
       <Route path='CheckBox/:sName' component={CheckBoxEdit}/>
       <Route path='DatePicker/:sName' component={DatePicker}/>
       <Route path='DateRange/:sName' component={DateRange}/>
       <Route path='Thankyou/:sName' component={ThankyouEdit}/>
       <Route path="Timer" component={Timer}/>
       <Route path="DraftDisplay" component={DraftDisplay}/>
       <Route path="TakeSurvey" component={TakeSurvey}/>
       <Route path="UploadCSV" component={UploadCSV}/>
       <Route path="OutLink" component={OutLink}/>
    </Route>
  </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);
