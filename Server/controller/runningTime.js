const surveyConfigModel=require('../models/ResultSchema');
module.exports=function (req, res) {
	const surveyConfig = new surveyConfigModel();
  surveyConfigModel.findOneAndUpdate({surveyname:req.params.sName},
  {$set:
    {
      publishtime:req.body.publishtime,
      endTime:req.body.endTime,
			status:req.body.status,
    }
  },
  function(err,doc){
  res.send("created");
        console.log("not exist");

  });

		}
