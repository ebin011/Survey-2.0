const addResult=require('../controller/addResult');
const userDetails = require('../controller/userDetails');
const answerSurvey = require('../controller/answerSurvey');
const fullAnswers = require('../controller/fullAnswers');
const publishSurvey = require('../controller/publishSurvey');
const express = require('express');
const router = express.Router();

console.log("inside add result route");
router.post('/api/addResult',addResult);
router.put('/api/answerSurvey/:sName',answerSurvey);
router.put('/api/userDetails/:sName',userDetails);
router.post('/api/fullAnswers/:sName',fullAnswers);
router.put('/api/publishSurvey/:sName',publishSurvey)
module.exports=router;
