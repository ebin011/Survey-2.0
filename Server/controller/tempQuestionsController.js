const tempQuestionsModel = require('../models/tempQuestionsSchema');
module.exports = function(req,res){

	const tempQuestions = new tempQuestionsModel();
	console.log("data",req.body[0],req.params.sName)
	
	tempQuestionsModel.findOneAndUpdate({surveyname:req.params.sName},{

		$push:{
			questions:req.body[0]

	}
  },
  function(err,res){

console.log("eror or not",res);  
  if(err)
  {
    console.log("Error"+err);

    res.send("error",err);
  }
 if(res){

        console.log("posted",res);
        res.send("created",res);
  }

  });
}