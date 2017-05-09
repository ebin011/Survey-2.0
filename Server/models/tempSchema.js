const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tempSchema=new Schema({
  questionno:{type:Number},
  question:{type:String},
  options:{type:String}
});


module.exports = mongoose.model('graph',tempSchema);
