const sendgrid = require('sendgrid')('ebin011@gmail.com','albinantony');
module.exports=function (req, res) {
	 sendgrid.send({
	 	to :'ebin011@gmail.com',
	 	from:'harsha9204@gmail.com',
	 	subject:'Hai',
	 	text:'sample'
	 });
  }, function (err,json) {
    if (err) {
      // handle error 
      console.log(err);
      res.send('There was an error sending the email');
      return;
    }
    console.log('Email Sent');
  
	
}
