const surveyConfigModel=require('../models/ResultSchema');
module.exports=function (req, res) {
	const surveyConfig = new surveyConfigModel();
	// db.surveyresults.update({surveyname:"try","questions.question":"text your comments"},
	// {"$push":{"questions.$.count":"40"}})
console.log("recived questio:",req.body.options[0]);
console.log("recived sname :",req.params.sName);
console.log("recived option:",req.body.options[1]);
		surveyConfigModel.findOneAndUpdate({surveyname:req.params.sName,"questions.question":req.body.options[0]},
			{"$push":	{"questions.$.count":req.body.options[1]}},
		function(err,doc){
			if(doc){
				res.send("DONE");
		      console.log("pushed :",req.body.options[1]);
			}
			else{
				res.send("ERR");
				console.log("failed to push",req.body.options[1])
			}

		});
	}
