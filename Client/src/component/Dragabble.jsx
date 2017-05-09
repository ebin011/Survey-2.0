import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid,Row,Col } from 'react-flexbox-grid';
import Divider from 'material-ui/Divider';

import MultiChoice from 'material-ui/svg-icons/action/list';
import StarRate from 'material-ui/svg-icons/toggle/star-border';
import Comment from 'material-ui/svg-icons/communication/comment';
import DropDown from 'material-ui/svg-icons/navigation/arrow-drop-down-circle';
import Slide from 'material-ui/svg-icons/editor/linear-scale';
import CheckBox from 'material-ui/svg-icons/toggle/check-box'
import ShortText from 'material-ui/svg-icons/editor/short-text';
import Welcome from 'material-ui/svg-icons/action/input';
import Group from 'material-ui/svg-icons/action/assignment';
import True from 'material-ui/svg-icons/maps/layers-clear';
import Thank from 'material-ui/svg-icons/action/thumb-up';
import Upload from 'material-ui/svg-icons/file/file-upload';
import DatePicker from 'material-ui/svg-icons/action/today';
import DateRange from 'material-ui/svg-icons/action/date-range';

import {IndexLink, Link} from 'react-router';

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
  const buttonStyle={
    width:'100%',
    marginTop:'5%',
    marginBottom:'5%',
  }
class Dragabble extends Component{

  constructor(props) {
    super(props);
    this.state = {

      files: [{name: 'Choose CSV file from your system'}],

    }
  }


  handleFileChange(event) {
    this.setState({ files: event.target.files });
  }

	render(){
      var welcomeUrl="Home/Welcome/"+this.props.surveyName;
      var SingleTextUrl="Home/SingleText/"+this.props.surveyName;
      var StarRatingsUrl="Home/StarRatings/"+this.props.surveyName;
      var MultiChoiceUrl="Home/MultiChoice/"+this.props.surveyName;
      var DropdownUrl="Home/Dropdown/"+this.props.surveyName;
      var CheckBoxUrl="Home/CheckBox/"+this.props.surveyName;
      var SliderUrl="Home/Slider/"+this.props.surveyName;
      var YesOrNoUrl="Home/YesOrNo/"+this.props.surveyName;
      var CommentsUrl="Home/Comments/"+this.props.surveyName;
      var DatePickerUrl="Home/DatePicker/"+this.props.surveyName;
      var DateRangeUrl="Home/DateRange/"+this.props.surveyName;
      var ThankyouUrl="Home/Thankyou/"+this.props.surveyName;
      var QgroupUrl="Home/Qgroup/"+this.props.surveyName;
		return(
        <div style={{backgroundColor:'#E0E0E0'}}>

            <Row style={{marginLeft:'1%',marginRight:'1%'}}>
              <Col xs={12}>
                <h2>Toolkit</h2>
              </Col>
              <Col xs={12}>
                <Link to={welcomeUrl} activeClassName="active">
                  <RaisedButton label="Welcome Screen" backgroundColor='#66BB6A' labelStyle={{fontWeight:'bold',textTransform:'capitalize'}} style={buttonStyle} icon={<Welcome />}/>
                </Link>
              </Col>
            </Row>
            <Row style={{marginLeft:'1%',marginRight:'1%'}}>
              <Col xs={12} md={6}>
                <Link to={SingleTextUrl} activeClassName="active">
                  <RaisedButton label="Short Questions" backgroundColor='#BDBDBD' labelStyle={{fontWeight:'bold',textTransform:'capitalize'}} buttonStyle={{textAlign:'left'}} style={buttonStyle} icon={<ShortText />}/>
                </Link>
              </Col>
              <Col xs={12} md={6}>
                <Link to={StarRatingsUrl} activeClassName="active">
                  <RaisedButton label="Star Ratings" backgroundColor='#BDBDBD' labelStyle={{fontWeight:'bold',textTransform:'capitalize'}} buttonStyle={{textAlign:'left'}} style={buttonStyle} icon={<StarRate />}/>
                </Link>
              </Col>
            </Row>
            <Row style={{marginLeft:'1%',marginRight:'1%'}}>
              <Col xs={12} md={6}>
                <Link to={MultiChoiceUrl} activeClassName="active">
                  <RaisedButton label="Multiple Choice" backgroundColor='#BDBDBD' labelStyle={{fontWeight:'bold',textTransform:'capitalize'}} buttonStyle={{textAlign:'left'}} style={buttonStyle} icon={<MultiChoice />}/>
                </Link>
              </Col>
              <Col xs={12} md={6}>
                <Link to={DropdownUrl} activeClassName="active">
                  <RaisedButton label="Dropdown" backgroundColor='#BDBDBD' labelStyle={{fontWeight:'bold',textTransform:'capitalize'}} buttonStyle={{textAlign:'left'}} style={buttonStyle} icon={<DropDown />}/>
                </Link>
              </Col>
            </Row>
            <Row style={{marginLeft:'1%',marginRight:'1%'}}>
              <Col xs={12} md={6}>
                <Link to={CheckBoxUrl} activeClassName="active">
                  <RaisedButton label="Checkbox" backgroundColor='#BDBDBD' labelStyle={{fontWeight:'bold',textTransform:'capitalize'}} buttonStyle={{textAlign:'left'}} style={buttonStyle} icon={<CheckBox />}/>
                </Link>
              </Col>
              <Col xs={12} md={6}>
                <Link to={SliderUrl} activeClassName="active">
                  <RaisedButton label="Slider" backgroundColor='#BDBDBD' labelStyle={{fontWeight:'bold',textTransform:'capitalize'}} buttonStyle={{textAlign:'left'}} style={buttonStyle} icon={<Slide />}/>
                </Link>
              </Col>
            </Row>
            <Row style={{marginLeft:'1%',marginRight:'1%'}}>
              <Col xs={12} md={6}>
                <Link to={QgroupUrl} activeClassName="active">
                  <RaisedButton label="Question Group" backgroundColor='#BDBDBD' labelStyle={{fontWeight:'bold',textTransform:'capitalize'}} buttonStyle={{textAlign:'left'}} style={buttonStyle} icon={<Group />}/>
                </Link>
              </Col>
              <Col xs={12} md={6}>
                <Link to={YesOrNoUrl} activeClassName="active">
                  <RaisedButton label="Yes/no" backgroundColor='#BDBDBD' labelStyle={{fontWeight:'bold',textTransform:'capitalize'}} buttonStyle={{textAlign:'left'}} style={buttonStyle} icon={<True />}/>
                </Link>
              </Col>
            </Row>
            <Row style={{marginLeft:'1%',marginRight:'1%'}}>
              <Col xs={12} md={6}>
                <Link to={CommentsUrl} activeClassName="active">
                  <RaisedButton label="Comments" backgroundColor='#BDBDBD' labelStyle={{fontWeight:'bold',textTransform:'capitalize'}} buttonStyle={{textAlign:'left'}} style={buttonStyle} icon={<Comment />}/>
                </Link>
              </Col>
              <Col xs={12} md={6} >
                <Link to={DatePickerUrl} activeClassName="active">
                  <RaisedButton label="Date Picker" backgroundColor='#BDBDBD' labelStyle={{fontWeight:'bold',textTransform:'capitalize'}} buttonStyle={{textAlign:'left'}} style={buttonStyle} icon={<DatePicker />}/>
                </Link>
              </Col>
            </Row>

            <Row style={{marginLeft:'1%',marginRight:'1%'}}>

              <Col xs={12} md={6} >
                <Link to={DateRangeUrl} activeClassName="active">
                  <RaisedButton label="Date Range" backgroundColor='#BDBDBD' labelStyle={{fontWeight:'bold',textTransform:'capitalize'}} buttonStyle={{textAlign:'left'}} style={buttonStyle} icon={<DateRange />}/>
                </Link>
              </Col>
            </Row>

            <Row style={{marginLeft:'1%',marginRight:'1%'}}>

              <Col xs={12} style={{marginBottom:'10%'}}>
                <Link to={ThankyouUrl} activeClassName="active">
                  <RaisedButton label="Thankyou" backgroundColor='#81D4FA' labelStyle={{fontWeight:'bold',textTransform:'capitalize'}} style={buttonStyle} icon={<Thank />}/>
                </Link>
              </Col>
            </Row>

           

          <Row style={{marginLeft:'1%',marginRight:'1%'}}>
          <p style={{textAlign:'center',fontWeight:'bold',marginLeft:'50%'}}>OR</p>
           </Row>

             <Row style={{marginLeft:'1%',marginRight:'1%'}}>
              <Col xs={12} style={{marginBottom:'3%'}}>
                <Link to="Home/UploadCSV" activeClassName="active">
                  <RaisedButton label="Upload CSV" backgroundColor='#616A6B' labelStyle={{fontWeight:'bold',textTransform:'capitalize'}} labelColor='#FDFEFE' style={buttonStyle} icon={<Upload />}/>
                </Link>
              </Col>
            </Row>

          </div>
    );
	}
 }
 export default Dragabble;
