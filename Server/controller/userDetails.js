const surveyConfigModel=require('../models/ResultSchema');
module.exports=function (req, res) {
	const surveyConfig = new surveyConfigModel();
	// db.surveyresults.update({surveyname:"try","questions.question":"text your comments"},
	// {"$push":{"questions.$.count":"40"}})
console.log("recived nae:",req.body.name);
console.log("recived sname :",req.params.sName);
console.log("recived option:",req.body.id,req.body.role);
		surveyConfigModel.findOneAndUpdate({surveyname:req.params.sName},
			{"$push":	{"name":req.body.name,"id":req.body.id,"role":req.body.role}},
		function(err,doc){
			if(doc){
				res.send("DONE");
		      console.log("pushed :",req.body.name);
			}
			else{
				res.send("ERR");
				console.log("failed to push",req.body.name)
			}

		});
	}
