const tempQuestionsModel = require('../models/tempQuestionsSchema');
module.exports=function (req, res) {
	const tempQuestions = new tempQuestionsModel();
		tempQuestionsModel.find(function(err,mySchema) {
				if(mySchema){
					console.log("get upto here");
					 console.log(JSON.stringify(mySchema));
					res.send(mySchema);
				}
				else{
					  res.send("created");
					console.log(err);
				}
		})

		}
