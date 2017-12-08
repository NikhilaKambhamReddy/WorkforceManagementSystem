/**
 * New node file
 */

var mq_client = require('../rpc/client');
var express = require('express');
var express2=require('express-session');
var router = express.Router();
var path = require('path');
var ejs = require("ejs");
var sys = require ('sys');
var http = require('http');
var fs=require('fs');



router.get('/RequestBuilding',function(req,res) {
	res.render('RequestBuilding');
});

router.get('/Clients',function(req,res){
	res.render('AdminViewClients');
});

router.get('/ClientList',function(req,res) {
	console.log("In ClientList");
	var msg_payload = { "type": "ClientList"};
	mq_client.make_request('client_queue',msg_payload, function(err,results){

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
router.post('/ClientDetails2', function(req,res) {
	console.log("In ClientDetails2");
	var id=req.param("num");
	var msg_payload = { "type": "ClientDetails2","id":id};
	mq_client.make_request('client_queue',msg_payload, function(err,results){

		console.log(results);
		if(err)
		{
			throw err;
		}
		else 
		{			
			console.log("Client side Details");
			console.log("res:"+results[0]);
			res.send(results);

		}  
	});
});

router.post('/DeleteClient',function(req,res) {
	console.log("In ClientDetails2");
	var id=req.param("num");
	var msg_payload = { "type": "DeleteClient","id":id};
	mq_client.make_request('client_queue',msg_payload, function(err,results){

		console.log(results);
		if(err)
		{
			throw err;
		}
		else 
		{			
			JSON.stringify(results);
			res.send(results);

		}  
	});
	
	

});
router.post('/requestbuildingform',function(req,res) {

	var id=req.param("id");
	var bname=req.param("bname");
	var coordinates01=req.param("coordinates01");
	var coordinates11=req.param("coordinates11");
	var coordinates21=req.param("coordinates21");
	var coordinates31=req.param("coordinates31");
	var description=req.param("description");

	console.log(id);
	
	var msg_payload = { "type": "requestbuildingform","id":id,"bname":bname,"coordinates01":coordinates01,"coordinates11":coordinates11,"coordinates21":coordinates21,"coordinates31": coordinates31,"description":description,"reqfulfilled":1};
	mq_client.make_request('client_queue',msg_payload, function(err,results){

		console.log(results);
		if(err)
		{
			throw err;
		}
		else 
		{			
			JSON.stringify(results);
			res.send(results);

		}  
	});
});

router.post('/SignIn',function(req,res) {
	var name=req.param("num");
	var pass=req.param("pass");
	console.log(name);
	//console.log("printing user id: "+req.session.emailid);

	var qry="select * from Person where Firstname=? and LoginPassword=?";
	var params=[name,pass];
	console.log("Query is:"+qry);
	res.send("success");

});



router.post('/EditPersonalDetails',function(req,res) {

	var fname=req.param("fname");
	var lname=req.param("lname");
	var addr=req.param("addr");
	var city=req.param("city");
	var state=req.param("state");
	var zip=req.param("zip");
	var phone=req.param("phone");
	var mail=req.param("mail");
	var id=req.param("num");
	console.log(id);

	var msg_payload = { "type": "EditPersonalDetails","fname":fname,"lname":lname,"addr":addr,"city":city,"state":state,"zip":zip,"phone":phone,"mail":mail,"id":id};
	mq_client.make_request('client_queue',msg_payload, function(err,results){

		console.log(results);
		if(err)
		{
			throw err;
		}
		else 
		{			
			JSON.stringify(results);
			res.send(results);

		}  
	});

});


router.post('/EditClientDetails',function(req,res) {

	var service=req.param("service");
	var bal=req.param("bal");
	var start=req.param("start");
	var end=req.param("end");
	var id=req.param("num");
	console.log(id);


	var msg_payload = { "type": "EditClientDetails","service":service,"bal":bal,"start":start,"end":end,"id":id};
	mq_client.make_request('client_queue',msg_payload, function(err,results){

		console.log(results);
		if(err)
		{
			throw err;
		}
		else 
		{			
			JSON.stringify(results);
			res.send(results);

		}  
	});

	
	

});



module.exports = router;
