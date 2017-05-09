import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {IndexLink, Link} from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FullscreenDialog from 'material-ui-fullscreen-dialog'
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { Grid,Col,Row} from 'react-flexbox-grid';
import GraphDisplay from './graphDisplay';
import Analyze from 'material-ui/svg-icons/action/assessment';
import Reminder from 'material-ui/svg-icons/navigation/refresh';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import $ from 'jquery';
import request from 'superagent';
class DisplayDetails extends Component{

    state = {
    value: 1,
    open: false,
    output:[],
    name:''
  };

  componentWillMount(){
    request

    .get('http://10.201.174.176:9080/api/getResultDetails/')

    .end((err,res) => {
      this.setState({
        output:res.body
      });
      console.log("result",res.body);
    });
  }
  handleOpen(name){
    console.log("name",name);
    this.setState({open: true,name:name});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange = (event, index, value) => this.setState({value});
  getTimeRemain(time,name,i){
    console.log("deefkjkj",time);
  var convertDate= new Date(time);
  console.log("deefkjkj",convertDate);
  setInterval(function() {

   var now = new Date();
   var difference = [];
   difference[i]=convertDate.getTime()- now.getTime();
   if (difference[i] <= 0) {

       // Timer done
       //clearInterval(timer);
       console.log("It is done");
       var status={status:'closed'}
     request.put('http://10.201.174.176:9080/api/publishSurvey/'+name)
             .set('Content-Type', 'application/json')
             .send(status)
              .then((err,res)=>
              {
                console.log("posted");
              });

   }
   else {

       var seconds=[];
       var minutes=[];
       var hours=[];
       var days=[];
       var remain=[];
       seconds[i] = Math.floor(difference[i] / 1000);
        minutes[i] = Math.floor(seconds[i] / 60);
      hours[i] = Math.floor(minutes[i] / 60);
       days[i] = Math.floor(hours[i] / 24);

       hours[i] %= 24;
       minutes[i] %= 60;
       seconds[i] %= 60;
       remain[i]=days[i]+":"+hours[i]+":"+minutes[i]+":"+seconds[i];
       $("#"+i).text(remain[i]);
      //  $("#hours").text(hours);
      //  $("#minutes").text(minutes);
      //  $("#seconds").text(seconds);

    }
    }, 1000);
}
	render(){

         const actions = [
                <FlatButton
                     label="Cancel"
                     primary={true}
                     onTouchTap={this.handleClose}
                />,

                 ];
    var details=[];

    details.push(this.state.output.map((obj,i)=>{
      if(obj.status=='Running'){
        return (<TableRow>
            <TableRowColumn>{obj.surveyname}</TableRowColumn>
            <TableRowColumn>{obj.publishtime}</TableRowColumn>
            <TableRowColumn>{obj.endTime}</TableRowColumn>
            <TableRowColumn>{obj.questions[0].count.length}</TableRowColumn>
            <TableRowColumn><RaisedButton label="Statistics" backgroundColor='#616A6B' labelColor='#FDFEFE' icon={<Analyze />} onTouchTap={this.handleOpen.bind(this,obj.surveyname)}/></TableRowColumn>
            <TableRowColumn ><Col xs={12}>
           <span id={i} style={{fontSize:'150%'}}>{this.getTimeRemain(obj.endTime,obj.surveyname,i)}</span>

        </Col></TableRowColumn>
            <TableRowColumn><RaisedButton label="Reminder" backgroundColor='#3498DB' labelColor='#FDFEFE' icon={<Reminder />} /></TableRowColumn>
            <TableRowColumn><RaisedButton label="Cancel" backgroundColor='#EC7063' labelColor='#FDFEFE' icon={<Cancel />} /></TableRowColumn>
        </TableRow>)
      }

    }));

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
                         <TableHeaderColumn style={{color:'#FDFEFE ',fontWeight:'bold'}}>END DATE</TableHeaderColumn>
                         <TableHeaderColumn style={{color:'#FDFEFE ',fontWeight:'bold'}}>RESPONSES</TableHeaderColumn>
                         <TableHeaderColumn style={{color:'#FDFEFE ',fontWeight:'bold'}}>ANALISE THE REPORT</TableHeaderColumn>
                         <TableHeaderColumn style={{color:'#FDFEFE ',fontWeight:'bold'}}>TIME REMAIN<br/>(DD:HH:MM:SS)</TableHeaderColumn>
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
                 title="Results"
                 actions={actions}
                 modal={false}
                 open={this.state.open}
                 onRequestClose={this.handleClose}
                 autoScrollBodyContent={true}
                 contentStyle={{height:'100%',width:'100%',maxHeight:'none',maxWidth: 'none'}}
                >
                 {<GraphDisplay name={this.state.name}/>}
               </FullscreenDialog>
                </Col>
                </Row>
                </Col>
                </Row>
			</Grid>);
		}
	}

   export default DisplayDetails;
