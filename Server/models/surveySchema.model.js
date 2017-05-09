const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questSchema=new Schema({
  questionno:{type:Number},
  questionType:{type:String},
  questionQ:{type:String},
  options:{type:Array},
  maxValue:{type:Number},
  minValue:{type:Number},
  scale:{type:Number}
},{
  _id: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});
const SurveySchema = new Schema({
  surveyname:{type:String},
  status:{type:String},

  welcomeMsg:{type:String},
  description:{type:String},
  thanksMessage:{type:String},
  createrName:{type:String},
  createrContact:{type:Number},
  createrEmail:{type:String},
  questions:[questSchema]
});
module.exports = mongoose.model('Survey',SurveySchema);
