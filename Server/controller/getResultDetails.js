const surveyConfigModel=require('../models/ResultSchema');
module.exports=function (req, res) {
	const surveyConfig = new surveyConfigModel();
		surveyConfigModel.find(function(err,mySchema) {
				if(mySchema){
					// console.log(JSON.stringify(mySchema));
					res.send(mySchema);
				}
				else{
					  res.send("created");
					console.log("mySchema");
				}
		})

		}
