const surveyConfigModel=require('../models/tempQuestionsSchema');
module.exports=function (req, res) {
	const surveyConfig = new surveyConfigModel();

			surveyConfig.surveyname=req.body.surveyname;
			// surveyConfig.status=req.body.status;
  			surveyConfig.save(function (err) {
     			if(!err){
     				res.send("created")
     			}
  			});

		}
