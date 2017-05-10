import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {IndexLink, Link} from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton  from 'material-ui/RaisedButton';
import FullscreenDialog from 'material-ui-fullscreen-dialog'
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { Grid,Col,Row} from 'react-flexbox-grid';
import GraphDisplay from './timer';
import request from 'superagent';
import { DateField,TransitionView, Calendar } from 'react-date-picker';
import Publish from 'material-ui/svg-icons/editor/publish';
import Preview from 'material-ui/svg-icons/action/pageview';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import $ from 'jquery';
var todayDate = new Date();
  var curDay=todayDate.getDate();
  var curMonth = todayDate.getMonth();
  var curYear = todayDate.getFullYear();

const onChange = (dateString, { dateMoment, timestamp }) => {

         var inputDate = dateString.split(/[-, ]+/);


         console.log("day"+curDay+"month"+curMonth+"year"+curYear+"inputDay"+inputDate[0]+"inputmonth"+inputDate[1]+"inputYear"+inputDate[2]);

            if(inputDate!=null && inputDate[0]<curYear)
            {
               alert("Select Atleast Current Year");
            }
            else if(inputDate!=null && (inputDate[0]>=curYear) && (inputDate[1]<(curMonth+1)) )
            {
                alert("Some  Problem with Month");
            }
            else if(inputDate!=null && (inputDate[0]>=curYear) && (inputDate[1]==(curMonth+1)) && (inputDate[2]<curDay) )
            {
                alert("Day should be equl or higher than current");
            }
            else
            {
                alert("fine");
                var convertDate= new Date(dateString);
               setInterval(function() {

                var now = new Date();
                var difference = convertDate.getTime() - now.getTime();

                if (difference <= 0) {

                    // Timer done
                    //clearInterval(timer);
                    alert("It is done");

                }
                else {

                    var seconds = Math.floor(difference / 1000);
                    var minutes = Math.floor(seconds / 60);
                    var hours = Math.floor(minutes / 60);
                    var days = Math.floor(hours / 24);

                    hours %= 24;
                    minutes %= 60;
                    seconds %= 60;

                    $("#days").text(days);
                    $("#hours").text(hours);
                    $("#minutes").text(minutes);
                    $("#seconds").text(seconds);

                 }
                 }, 1000);
     }
 }
class DraftDisplay extends Component{

    state = {
    value: 1,
    open: false,
    output:[],
    name:''
  };
   componentWillMount(){
     request
     .get('http://10.42.0.130:9080/api/getDetails/')
     .end((err,res) => {
       this.setState({
         output:res.body
       });
       console.log("result",res.body);
     });
   }
  handleOpen(name){
    var status={status:'Running'}
  request.put('http://10.42.0.130:9080/api/publishSurvey/'+name)
          .set('Content-Type', 'application/json')
          .send(status)
           .then((err,res)=>
           {
             console.log("posted");
           });
    this.setState({open: true,name:name});
  };

  handleClose = () => {
    this.setState({open: false});
  };


  handleChange = (event, index, value) => this.setState({value});

	render(){
var details=[];
details.push(this.state.output.map((obj)=>{
  if(obj.status=='draft'){
    return(
      <TableRow>
          <TableRowColumn>{obj.surveyname}</TableRowColumn>
          <TableRowColumn>26 Feb 2017</TableRowColumn>
          <TableRowColumn><RaisedButton label="Publish" backgroundColor='#1E8449' labelColor='#FDFEFE' icon={<Publish />} onTouchTap={this.handleOpen.bind(this,obj.surveyname)}/></TableRowColumn>
          <TableRowColumn><RaisedButton label="Preview" backgroundColor='#3498DB' labelColor='#FDFEFE' icon={<Preview />} /></TableRowColumn>
          <TableRowColumn><RaisedButton label="Delete" backgroundColor='#EC7063' labelColor='#FDFEFE' icon={<Cancel />} /></TableRowColumn>
      </TableRow>
    );
  }}));
         const actions = [
                <FlatButton
                     label="Cancel"
                     primary={true}
                     onTouchTap={this.handleClose}

                />,

                 ];

		return(<Grid>

                <Row middle="xs">
                <Col xs={12}>

                <Row>
                <Col xs={12}>
                <Paper>
                <Table >
                    <TableHeader style={{backgroundColor:'#283747'}} displaySelectAll={false} adjustForCheckbox={false}>
                      <TableRow>
                         <TableHeaderColumn style={{color:'#FDFEFE ',fontWeight:'bold'}}>TITTLE</TableHeaderColumn>
                         <TableHeaderColumn style={{color:'#FDFEFE ',fontWeight:'bold'}}>CREATE DATE</TableHeaderColumn>
                          <TableHeaderColumn style={{color:'#FDFEFE ',fontWeight:'bold'}}></TableHeaderColumn>
                           <TableHeaderColumn style={{color:'#FDFEFE ',fontWeight:'bold'}}></TableHeaderColumn>
                            <TableHeaderColumn style={{color:'#FDFEFE ',fontWeight:'bold'}}></TableHeaderColumn>

                     </TableRow>
                     </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                      {details}

                  </TableBody>
                </Table>
                </Paper>
                <FullscreenDialog
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                  title={'Select Your Time'}
                  style={{height:'80%',textAlign:'center'}}
                  containerStyle={{background:'transparent\9'}}
                  actionButton={<RaisedButton
                      label='Done'
                      onTouchTap={() => this.setState({ open: false })}
                      />}
                    >
                 {<GraphDisplay />}
               </FullscreenDialog>
                </Col>
                </Row>
                </Col>
                </Row>
			</Grid>);
		}
	}

   export default DraftDisplay;
