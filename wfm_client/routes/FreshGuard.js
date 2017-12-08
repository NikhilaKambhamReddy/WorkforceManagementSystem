var mq_client = require('../rpc/client');
var express = require('express');
var express2=require('express-session');
var router = express.Router();
var path = require('path');
var ejs = require("ejs");
var sys = require ('sys');
var http = require('http');
var fs=require('fs');



router.get('/signupguard', function(req, res) {
	  res.render('signupGuard');
});

router.get('/GuardList',function(req,res) {
	console.log("In GuardList");
	var msg_payload = { "type": "GuardList"};
	mq_client.make_request('guard_queue',msg_payload, function(err,results){

		console.log(results);
		if(err)
		{
			throw err;
		}
		else 
		{			

			console.log(typeof(results));
			JSON.stringify(results);
			console.log(results);
			res.send(results);

		}  
	});
});

router.post('/aftersignup', function(req, res) {
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var ssn = req.body.ssn;
	var password = req.body.password;
	var email = req.body.email;
	var address = req.body.address;
	var city = req.body.city;
	var zip = req.body.zip;
	var state = req.body.state;
	var phonenumber = req.body.phonenumber;
	var type = req.body.type;
	console.log(type+"person type");
	ses=req.session;
	ses.ssn=ssn;
	console.log(ses.ssn + 'session');
	var msg_payload = { "firstname": firstname, "lastname": lastname,
			"ssn": ssn, "password": password,"email": email, "address": address,"city": city, 
			"zip": zip, "state": state,"phonenumber": phonenumber, "type": type, "service": "signup"};
	
	mq_client.make_request('guard_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err)
		{
			throw err;
		}
		else 
		{			
			if(results.code == 200){
				console.log("valid Login");
				res.send({"signup":type});
			}
			else {    
				console.log("Invalid Login");
				res.send({"signup":"Fail"});
			}
		}  
	});
	
});
router.post('/PopulateBuildingClient',function(req,res){
	var msg_payload = {"type":"PopulateBuildingClient"};
	mq_client.make_request('guard_queue',msg_payload, function(err,results){

		if(results.affectedRows==1){ 
			console.log('The solution is: ', rows);

		}
		else {  console.log('Error while performing Query.');}

		res.send(results);	 
	});
});
router.post('/GuardDetails', function(req,res) {
	console.log("In GuardDetails");
	var id=req.param("num");
	var msg_payload = { "type": "GuardDetails","id":id};
	mq_client.make_request('guard_queue',msg_payload, function(err,results){

		console.log(results);
		if(err)
		{
			throw err;
		}
		else 
		{			
			console.log("GuardDetails");
			console.log("res:"+results[0]);
			res.send(results);

		}  
	});
});

module.exports = router;