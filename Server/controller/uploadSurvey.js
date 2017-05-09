const surveyConfigModel=require('../models/surveySchema.model');
module.exports=function (req, res) {
	const surveyConfig = new surveyConfigModel();
  surveyConfigModel.findOneAndUpdate({surveyname:req.params.sName},
  {$set:
    {
      welcomeMsg:req.body.welcomeMsg,
      description:req.body.description,
      thanksMessage:req.body.thanksMessage,
      createrContact:req.body.createrContact,
      createrName:req.body.createrName,
      creterEmail:req.body.creterEmail,
      questions:req.body.questions
    }
  },
  function(err,doc){
  res.send("created");
  if(err)
  {
    console.log("Error"+err);
  }
        console.log("not exist");

  });

		}
