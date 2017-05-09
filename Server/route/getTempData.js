const express=require('express');
const router=express.Router();
const getTempData=require('../controller/getTempSchema');

router.get('/api/result',getTempData);
module.exports=router;