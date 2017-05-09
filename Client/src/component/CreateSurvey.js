import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import background from '../../images/Home.jpg';
import {IndexLink, Link} from 'react-router';
import { Grid,Col,Row} from 'react-flexbox-grid';
import Create from 'material-ui/svg-icons/content/create';
import Running from 'material-ui/svg-icons/maps/directions-run';
import Close from 'material-ui/svg-icons/navigation/close';
import Drafts from 'material-ui/svg-icons/content/drafts';

import request from 'superagent';

import SurveyDetails from './SurveyDetails';



class CreateSurvey extends Component {
  constructor(props) {
      super(props);
    this.state = {
      open: false,
      name:'',
      output:[]

  }}
  componentWillMount(){
    request
    .get('http://10.201.174.176:9080/api/getDetails/')
    .end((err,res) => {

      this.setState({
        output:res.body
      });
      console.log("result",res.body);
    });
  }
  createDb(){

    console.log("name set Sucess", this.state.name);
    localStorage.setItem("sName", this.state.name);
    var nameData={
      surveyname:this.state.name,
      status:'draft'
    }
    request.post('http://10.201.174.176:9080/api/createSurvey')
            .set('Content-Type', 'application/json')
            .send(nameData)
             .end((err,res)=>
             {
              if(err){
               console.log("faild posted");
              }
              })

  }
  nameChange(e)
  {
    this.setState({
      name:e.target.value
    })
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    var drafts=0;
    var running=0;
    var closed=0;
    var url='Home/AddQuestion/'+this.state.name
this.state.output.map((obj,i)=>{
  if(obj.status=="draft"){
    drafts++;
  }
  else if (obj.status=="Running") {
    running++;
  }
  else if (obj.status=="closed") {
    closed++;
  }
});

    return(


<Grid>
   <Row>
   <Col xs={12}>
    <Paper  style={{ marginTop:'1%',textAlign:'center'}}>
         <Card >
            <Row middle="xs">
             <Col xs={4}>
             <CardText style={{background:'#FFFFFF'}}>
              <Row center="xs">
              <Col xs={12}>
             <Avatar

          size={150}

                />
              <h2>User Name</h2>
              <h4>Emp-Id</h4>

              <h4>Designation</h4>
              </Col>
              </Row>
             </CardText>
              </Col>

              <Col xs={3}>
              <CardText>
              <Row middle="xs">
              <Col xs={12}>
              <h3 style={{color:'#28B463',fontSize:'175%',textAlign:'left', fontFamily: 'Black Ops One'}}>Easy Way to Survey</h3>
              <h3 style={{color:'#28B463',fontSize:'180%',fontFamily: 'Black Ops One'}}>Your Audience</h3>
              </Col>

              </Row>
              </CardText>
              </Col>
            <Col xs={5}>
            <CardMedia style={{marginLeft:0}}>
             <img src={background} style={{width:'auto',height:'20%'}} />
            </CardMedia>
              </Col>
             </Row>
            <CardActions>
            <Divider />

              <RaisedButton label="Create New Survey"
                icon={<Create />}
                backgroundColor='#1C6D03 '
                labelStyle={{color:'#FFFFFF ',fontWeight:'bold',marginTop:'4%'}}
                style={{textAlign:'center',width:'25%',marginTop:'2%',marginBottom:'1%',padding:'0px'}}
                onTouchTap={this.handleOpen}/>

            </CardActions>
  </Card>

    </Paper>

</Col>
<Col xs={12}>
    <Paper  style={{ marginTop:'2%'}}>
         <Row>


         <Card style={{textAlign:'center'}} >
         <Row>
         <Col xs={4}>

         <CardText>
         <h3>Running</h3>
         <Divider />
         <Avatar
          icon= {<Running/>}
          size={150}
          backgroundColor={'#27AE60'}
          style={{marginTop:'2%'}}
         />
         <h2 style={{fontSize:'125%'}}>{running}</h2>
          <h5 style={{fontSize:'125%',marginTop:'0px',marginBottom:'0px'}}>Your active surveys are here Click below to get details</h5>
          </CardText>
           <CardActions>
            <Link to="Home/Details" activeClassName="active">
            <FlatButton
            backgroundColor="#27AE60"

            style={{width:'100%' ,textAlign: 'center',fontWeight: 'bold',marginTop:'0px',marginBottom:'0px'}}
            label="Running"
            labelStyle={{fontSize:'125%',color:'#FDFEFE',fontWeight:'bold'}}/>
            </Link>
           </CardActions>



         </Col>

         <Col xs={4}>
           <CardText>
           <h3>Closed</h3>
           <Divider />
            <Avatar
             size={150}
             icon= {<Close/>}
             backgroundColor={'#E74C3C'}
             style={{marginTop:'2%'}}
            />
              <h2 style={{fontSize:'125%'}}>{closed}</h2>
              <h5 style={{fontSize:'125%',marginTop:'0px',marginBottom:'0px'}}>Already closed surveys are here Click below to get details</h5>

          </CardText>
           <CardActions>
            <Link to="Home/Timer" activeClassName="active">
            <FlatButton
            backgroundColor="#E74C3C"
            style={{width:'100%' ,textAlign: 'center',marginTop:'0px',fontWeight: 'bold',marginBottom:'0px'}}
            label="Closed"
            labelStyle={{fontSize:'125%',color:'#FDFEFE',fontWeight:'bold'}}/>
            </Link>
           </CardActions>



         </Col>

          <Col xs={4}>



         <CardText>
         <h3>Drafts</h3>
          <Divider/>

          <Avatar
           icon= {<Drafts/>}
           size={150}
           backgroundColor={'#F39C12'}
           style={{marginTop:'2%'}}
          />

          <h2 style={{fontSize:'125%'}}>{drafts}</h2>
          <h5 style={{fontSize:'125%',marginTop:'0px',marginBottom:'0px'}}>Your all draft surveys are here Click below to get details</h5>

          </CardText>
           <CardActions>
           <Link to="Home/DraftDisplay" activeClassName="active">
            <FlatButton
            backgroundColor="#F39C12"

            style={{width:'100%' ,textAlign: 'center',fontWeight: 'bold',marginTop:'0px',marginBottom:'0px'}}
            label="Drafts"
            labelStyle={{fontSize:'125%',color:'#FDFEFE',fontWeight:'bold'}}/>
            </Link>
           </CardActions>
          </Col>
          </Row>
         </Card>

         </Row>
         </Paper>
</Col>
         <Dialog
          title="Name Your Survey"
          modal={false}
          contentStyle={{width:'60%'}}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <Row  middle="xs">

         <Col xs={12}>

          <TextField
            hintText="Name of the survey"
            onChange={this.nameChange.bind(this)}
          />
        </Col>
        <Col xs={12}>
        <Row>

        <Col xsOffset={1}  xs={1}>
          <Link to={url} activeClassName="active">
            <RaisedButton label="Start" onClick={this.createDb.bind(this)} backgroundColor="#1C6D03" labelColor='white' labelStyle={{fontWeight:'bold'}} />
          </Link>
        </Col>
          </Row>

          </Col>

        </Row>
        </Dialog>
        </Row>


</Grid>


   );

    }
}

export default CreateSurvey;
