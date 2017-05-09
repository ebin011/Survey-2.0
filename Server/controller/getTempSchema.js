const mongoModel=require('../models/surveySchema.model');
module.exports=function(req,res)
{
	const mongoModelList=new mongoModel();
	


mongoModel.find(function(err,data)
{
	console.log("getting Connection");

	if(err)throw error;
	if(data)
	{
		console.log("getting"+data[0].thanksMessage);

		mongoModel.count({thanksMessage:data[0].thanksMessage},function(err,number)
        {
	        console.log("getting Connection");

	        if(err)throw error;
	        if(number)
	        {
		        console.log("getting"+number);
		
	        }
	


        });
		res.send(data);
	}
	else
	{
		res.send("Doesn't exist");
	}


});



}
