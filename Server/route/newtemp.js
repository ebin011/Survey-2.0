const newtemp=require('../controller/newtemp');
const express = require('express');
const router = express.Router();

router.put('/api/addData',newtemp)
module.exports=router;
