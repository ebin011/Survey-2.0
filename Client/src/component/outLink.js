//var myWindow=window.open("http://10.42.0.130:3000/");
import React,{Component} from 'react';
var myWindow;

class OutLink extends Component{

    componentWillMount() {
        window.location="http://10.42.0.130:3000/#/Home/Preview/newtest"

 }

    render(){

        return(
              <h1>Redirecting to your page</h1>
              );
    }

}
export default OutLink;
