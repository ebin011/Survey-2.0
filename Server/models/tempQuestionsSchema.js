const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionsSchema=new Schema({

	questionNo:{type:Number},
	questionType:{type:String},
	questionQ:{type:String},
	options:{type:Array},
	maxValue:{type:Number},
	scale:{type:Number}
},{

	id:false,
	toObject:{virtuals:true},
	toJSON:{virtuals:true}
});
const TempSchema = new Schema({
	surveyname:{type:String},
    questions:[questionsSchema]
});

module.exports=mongoose.model('surveyTempquestions',TempSchema);