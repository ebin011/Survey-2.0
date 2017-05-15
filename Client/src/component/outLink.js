//var myWindow=window.open("http://10.201.174.176:3000/");
import React,{Component} from 'react';
var myWindow;

class OutLink extends Component{

    componentWillMount() {
        window.location="http://10.201.174.176:3000/#/Home/Preview/newtest"

 }

    render(){

        return(
              <h1>Redirecting to your page</h1>
              );
    }

}
export default OutLink;
