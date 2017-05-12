const newtemp=require('../models/tempQuestionsSchema');
module.exports=function(req,res){
  const newTempData=newtemp();
console.log("req.body",req.body,res.body);
  newtemp.findOneAndUpdate({'surveyname':"test"},{$set:req.body},function(req,err){
    if(req){
      res.send("Done")
    //  console.log("connected new temp",req);
    }
    else {
      res.send("err")
    //  console.log("error connecing temp",err);
    }
  })
}
