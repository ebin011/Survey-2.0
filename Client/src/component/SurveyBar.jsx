import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';



import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Home from 'material-ui/svg-icons/action/home';
import Refresh from 'material-ui/svg-icons/navigation/refresh';
import AllData from 'material-ui/svg-icons/action/dashboard';
import Signout from 'material-ui/svg-icons/action/highlight-off';

import {IndexLink, Link} from 'react-router';
class Login extends Component {
 static muiName = 'IconMenu';

 render() {
   return (
     <FlatButton {...this.props} label="Login" />
   );
 }
}

const Logged = (props) => (
 <IconMenu
   {...props}
   iconButtonElement={
     <IconButton><MoreVertIcon /></IconButton>
   }
   targetOrigin={{horizontal: 'right', vertical: 'top'}}
   anchorOrigin={{horizontal: 'right', vertical: 'top'}}
 >
   <MenuItem primaryText="Home"  leftIcon={<Home />}/>
   <MenuItem primaryText="All Serveys" leftIcon={<AllData />} />
   <Link to="/" activeClassName="active">
    <MenuItem primaryText="Sign out" leftIcon={<Signout />}/>
   </Link>
 </IconMenu>
);

Logged.muiName = 'IconMenu';

/**
* This example is taking advantage of the composability of the `AppBar`
* to render different components depending on the application state.
*/
class SurveyBar extends Component {
 state = {
   logged: true,
 };

 handleChange = (event, logged) => {
   this.setState({logged: logged});
 };

 render() {
   return (
     <div>

       <AppBar
         title="Start Survey"
         titleStyle={{fontFamily: 'Aladin',fontSize:'150%'}}
         style={{background:'#145A32',marginTop:0,marginLeft:0,marginRight:0}}
         iconElementLeft={<Home style={{marginTop:'20%',marginBottom:0,marginRight:'3%'}} color={'#FDFEFE'}/>}
         iconElementRight={ <Logged /> }
       />
     </div>
   );
 }
}

export default SurveyBar;
