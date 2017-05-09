const getResult=require('../controller/getResult');
const getResultDetails=require('../controller/getResultDetails');
const express = require('express');
const router = express.Router();

router.get('/api/getResult/:sName',getResult);
router.get('/api/getResultDetails',getResultDetails);
module.exports=router;
