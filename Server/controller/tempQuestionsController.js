const tempQuestionsModel = require('../models/tempQuestionsSchema');
module.exports = function(req,res){

	const tempQuestions = new tempQuestionsModel();
	console.log("data",req.body,req.params.sName)
	tempQuestions.questions=req.body;
	tempQuestions.save(function (err) {
     			if(!err){
     				res.send("created")
     				console.log("sucess")
     			}
     			else{
     				console.log(err)
     			}
  			});
// 	tempQuestionsModel.findOneAndUpdate({surveyname:req.params.sName},
// 	{$set:
// 		{
// 			questions:req.body
// 	   }
//   },
//   function(err,doc){

// console.log("eror or not",doc,err);  
//   if(err)
//   {
//     console.log("Error"+err);

//     res.send("error",err);
//   }
//  if(doc){

//         console.log("posted",doc);
//         res.send("created",res);
//   }

//   });
}