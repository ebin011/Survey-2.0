const mailRouter=require('../controller/mailRouter');

const express=require('express');
const router=express.Router();


router.get('/api/mailRoute',mailRouter);
module.exports=router;
