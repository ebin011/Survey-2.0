const surveyResultModel=require('../models/ResultSchema');

var data=[];
module.exports=function (req, res) {
	const surveyResult = new surveyResultModel();
	surveyResultModel.find({surveyname:req.params.sName},function (err, mySchema) {
		if (err) {
			  res.send("created");
			console.log("error in survey");
		}
		if(mySchema){
			console.log(mySchema);
			res.send(mySchema)
		}
		else{
			console.log("Database survey doesn't exist");
			res.send("Database survey doesn't exist");
		}
	});


}
