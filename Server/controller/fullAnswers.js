const surveyConfigModel=require('../models/ResultSchema');
module.exports=function (req, res) {
	const surveyConfig = new surveyConfigModel();
	// db.surveyresults.update({surveyname:"try","questions.question":"text your comments"},
	// {"$push":{"questions.$.count":"40"}})
console.log("recived questio:",req.body.length,req.body);
for(i=0;i<req.body.length;i++){
	if(req.body[i].type=='question'){
		surveyConfigModel.findOneAndUpdate({surveyname:req.params.sName,"questions.question":req.body[i].quest},
			{"$push":	{"questions.$.count":req.body[i].answer}},
		function(err,doc){
			if(doc){
					console.log("pushed");
			}
			else{
				console.log("failed to push",req.body[i].answer)
			}

		});
	}

	else if(req.body[i].type=='userDetails'){
		surveyConfigModel.findOneAndUpdate({surveyname:req.params.sName},
			{"$push":	{"name":req.body[i].name,"id":req.body[i].id,"role":req.body[i].role}},
		function(err,doc){
			if(doc){

					console.log("pushed");
			}
			else{

				console.log("failed to push",req.body[i].name)
			}

		});
	}

 }res.send("DONE");
}
