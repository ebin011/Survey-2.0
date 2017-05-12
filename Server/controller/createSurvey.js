const surveyConfigModel=require('../models/surveySchema.model');
module.exports=function (req, res) {
	const surveyConfig = new surveyConfigModel();

			surveyConfig.surveyname=req.body.surveyname;
			surveyConfig.status=req.body.status;
  			surveyConfig.save(function (err) {
     			if(!err){
     				console.log("ok");
     				res.send("created")
     			}
     			else
     			{
     				console.log(err);
     			}
  			});

		}
