
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

const port = process.env.PORT || 9080;
const createSurveyConfigRoute=require('./route/createSurvey.route');
const getTempData=require('./route/getTempData');
const getResultConfigRoute=require('./route/getResult.route');
const addResult=require('./route/addResult.route');

const http = require('http');
const mongoose = require('mongoose');
const connection=mongoose.connect('mongodb://localhost/surveyDetails');


var BodyParser = require('body-parser');
app.use(BodyParser());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
app.use('/',createSurveyConfigRoute);
app.use('/',getTempData);
app.use('/',getResultConfigRoute);
app.use('/',addResult);

// var transporter = nodemailer.createTransport({

// 	service:'gmail',
// 	auth:{

// 		user:'testing.amith@gmail.com',
// 		pass:'testing123'
// 		// xoauth2:xoauth2.createXOAuth2Generator({

// 		// 	user:'testing.amith@gmail.com',
// 		// 	clientId:' 593409470744-lf3naakdah75skljp7btdbfi2druc6m2.apps.googleusercontent.com ',
// 		// 	clientSecret:' ZpNHuPRyieY50ZUgZwnYdHp- ',
// 		// 	refreshToken:'1/jw_nOL_lfmgQj9OU3MVvHWNJ6E5CU06akAzcbnIeRFg',
// 		// 	accessToken:'ya29.GlsUBEhQGpi0tPRLa6RgbS401ZAe9jrH-ACuuKWvv3yHC2yuOnmQLs5y00t9nF11ARtzL4YI9tEsTlwF1yPLEJLcMmPwiGUvTFfiqs2W_9QQx-nZ3rt4xqoNJghH'
// 		// })
// 	}

// })

// var mailOptions = {

// 	from:'testing.amith@gmail.com',
// 	to: 'anishu2011@gmail.com',
// 	subject:'Testing',
// 	text:"Mole nee pettu"
// }

// transporter.sendMail(mailOptions,function(err,res){

// 	if(err)
// 	{

// 		console.log(err)
// 	}
// 	else
// 	{
// 		console.log("Sent")
// 	}
// })
const server = http.createServer(app);
server.listen(port, () => {

    console.log('Express server started');
});
