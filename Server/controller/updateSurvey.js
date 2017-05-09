const surveyConfigModel=require('../models/surveySchema.model');
module.exports=function (req, res) {
	const surveyConfig = new surveyConfigModel();
	if(req.body.type=='welcome'){
		surveyConfigModel.findOneAndUpdate({surveyname:req.body.sName},
		{$set:{welcomeMsg:req.body.welcomeMsg,description:req.body.description}},
		function(err,doc){
				  res.send("created");
		      console.log("not exist");

		});
	}
else if(req.body.type=='thanksMessage'){
	console.log("inside thanks");
	surveyConfigModel.findOneAndUpdate({surveyname:req.body.sName},
	{$set:{
		createrEmail:req.body.createrEmail,
		createrName:req.body.createrName,
		thanksMessage:req.body.thanksMessage,
		createrContact:req.body.createrContact
	}},
	function(err,doc){
	console.log("thanks err",err);
	console.log(req.body.thanksMessage);
	  res.send("created");
				console.log("not exist");

	});
}
else if(req.body.type=='yesorno'){
	surveyConfigModel.findOneAndUpdate({surveyname:req.body.sName},
	{$push:{
		questions:req.body.questions
	}},
	function(err,doc){
  res.send("created");
				console.log("not exist");

	});
}
else if(req.body.type=='starrate'){
	surveyConfigModel.findOneAndUpdate({surveyname:req.body.sName},
	{$push:{
		questions:req.body.questions
	}},
	function(err,doc){
  res.send("created");
				console.log("not exist");

	});
}
else if(req.body.type=='slider'){
	surveyConfigModel.findOneAndUpdate({surveyname:req.body.sName},
	{$push:{
		questions:req.body.questions
	}},
	function(err,doc){
  res.send("created");
				console.log("not exist");

	});
}
else if(req.body.type=='singletext'){
	surveyConfigModel.findOneAndUpdate({surveyname:req.body.sName},
	{$push:{
		questions:req.body.questions
	}},
	function(err,doc){
  res.send("created");
				console.log("not exist");

	});
}
else if(req.body.type=='multichoice'){
	surveyConfigModel.findOneAndUpdate({surveyname:req.body.sName},
	{$push:{
		questions:req.body.questions
	}},
	function(err,doc){
  res.send("created");
				console.log("not exist");

	});
}
else if(req.body.type=='dropdown'){
	surveyConfigModel.findOneAndUpdate({surveyname:req.body.sName},
	{$push:{
		questions:req.body.questions
	}},
	function(err,doc){
  res.send("created");
				console.log("not exist");

	});
}
else if(req.body.type=='comments'){
	surveyConfigModel.findOneAndUpdate({surveyname:req.body.sName},
	{$push:{
		questions:req.body.questions
	}},
	function(err,doc){
  res.send("created");
				console.log("not exist");

	});
}
else if(req.body.type=='checkbox'){
	surveyConfigModel.findOneAndUpdate({surveyname:req.body.sName},
	{$push:{
		questions:req.body.questions
	}},
	function(err,doc){
  res.send("created");
				console.log("not exist");

	});
}
else if(req.body.type=='datePicker'){
	surveyConfigModel.findOneAndUpdate({surveyname:req.body.sName},
	{$push:{
		questions:req.body.questions
	}},
	function(err,doc){
  res.send("created");
				console.log("not exist");

	});
}
else if(req.body.type=='dateRange'){
	surveyConfigModel.findOneAndUpdate({surveyname:req.body.sName},
	{$push:{
		questions:req.body.questions
	}},
	function(err,doc){
  res.send("created");
				console.log("not exist");

	});
}
else{

}


		}
