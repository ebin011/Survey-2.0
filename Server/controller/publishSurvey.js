const surveyConfigModel=require('../models/surveySchema.model');
module.exports=function (req, res) {
	const surveyConfig = new surveyConfigModel();
	// db.surveyresults.update({surveyname:"try","questions.question":"text your comments"},
	// {"$push":{"questions.$.count":"40"}})
console.log("sname",req.params.sName);
		surveyConfigModel.findOneAndUpdate({surveyname:req.params.sName},
			{"$set":	{"status":req.body.status}},
		function(err,doc){
			if(doc){
				  res.send("created");
		      console.log("not exist",doc);
			}
		});
	}
