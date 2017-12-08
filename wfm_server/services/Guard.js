/**
 * New node file
 */
var mysql = require('./mysql');
var bcrypt = require ('bcrypt');


function submitAlertPage(msg, callback){
	console.log("In Server submitAlertPage");
	var res = {};
	var qry="INSERT INTO alerts(Alerts_ID,AlertName,AlertDescription,Severity) VALUES ('"+msg.id+"','"+msg.name+"','"+msg.desc+"','"+msg.sev+"')";
	mysql.handle_database(function(err,results){

		if(err){
			console.log(err);
			throw err;
		}
		else 
		{
			console.log("In submitAlertPage Output");
			callback(null, results);

		}
	},qry);

}
exports.submitAlertPage = submitAlertPage;

function listGuard(msg, callback){
console.log('listguards');
	var res = {};

	var qry="SELECT guard.Guard_ID,person.Firstname,person.Lastname,guard.Building_ID FROM guard JOIN person ON guard.Guard_ID=person.SSN;";
	mysql.handle_database(function(err,results){

		if(err){
			console.log(err);
			throw err;
		}
		else 
		{
			console.log("In submitAlertPage Output");
			callback(null, results);

		}
	},qry);

}
exports.listGuard = listGuard;


function searchGuard(msg, callback){

	var res = {};
	var qry="SELECT * FROM guard JOIN person ON guard.Guard_ID=person.SSN WHERE person.Firstname='"+msg.firstName+"'";
	mysql.handle_database(function(err,results){

		if(err){
			console.log(err);
			throw err;
		}
		else 
		{
			console.log("In submitAlertPage Output");
			callback(null, results);

		}
	},qry);

}
exports.searchGuard = searchGuard;

function create(msg, callback){
     console.log("in create guard new");
     console.log(msg);
	var res = {};
	var qry1="INSERT INTO person (Firstname,Lastname,Person_Type_ID,SSN,Address,City,State,Zipcode,Phone_number,EmailID,LoginPassword) VALUES ('"+msg.fname+"','"+msg.lname+"',3,'"+msg.guardid+"','"+msg.addr+"','"+msg.city+"','"+msg.state+"','"+msg.zip+"','"+msg.phone+"','"+msg.email+"','"+msg.password+"')";

	var qry2=" INSERT INTO guard(Guard_ID,No_of_Hours_perday,Building_ID,DateofJoining,LastDay,BackGroundStatus,Client_ID) values('"+msg.guardid+"','"+msg.totalhours+"','"+msg.buildingid+"','"+msg.sdate+"','"+msg.ldate+"',1,"+msg.ClientID+","+msg.mon+","+msg.tue+","+msg.wed+","+msg.thu+","+msg.fri+","+msg.sat+","+msg.sun+")";
	//var qry=gry1+qry2;
	console.log(qry1);
	console.log(qry2);
	mysql.handle_database(function(err,results){

		if(err){
			console.log(err);
			throw err;
		}
		else 
		{
				console.log("results from query 1" + results);
			mysql.handle_database(function(err,results){

				if(err){
					console.log(err);
					throw err;
				}
				else 
				{
					console.log("In submitAlertPage Output");
					callback(null, results);

				}
			},qry2);
			

		}
	},qry1);

}
exports.create = create;



function CreateGuard(msg, callback){

	var res = {};
	
	var qry="SELECT * FROM person JOIN guard	ON guard.Guard_ID=person.SSN WHERE guard.Guard_ID="+msg.guardid+";";
	mysql.handle_database(function(err,results){

		if(err){
			console.log(err);
			throw err;
		}
		else 
		{
			console.log("In submitAlertPage Output");
			callback(null, results);

		}
	},qry);

}
exports.CreateGuard = CreateGuard;


function deleteGuard(msg, callback){

	var res = {};
	
	var qry="DELETE FROM guard WHERE Guard_ID= '"+msg.id+"'";
	mysql.handle_database(function(err,results){

		if(err){
			console.log(err);
			throw err;
		}
		else 
		{
			console.log("In submitAlertPage Output");
			callback(null, results);

		}
	},qry);

}
exports.deleteGuard = deleteGuard;

function GuardList(msg, callback){
	console.log("In Server Guardlist");
	var res = {};
	var sqlFindUser = "select * from Person where Person_Type_ID=3";
	mysql.handle_database(function(err,results){

		if(err){
			console.log(err);
			throw err;
		}
		else 
		{
			console.log("In Guardlist Output");
			callback(null, results);

		}
	},sqlFindUser);

}
exports.GuardList = GuardList;


function update(msg, callback){

	var res = {};
	
	
	var qry1="UPDATE person SET Firstname='"+msg.fname+"',Lastname='"+msg.lname+"',Address='"+msg.addr+"',City='"+msg.city+"',State='"+msg.state+"',Zipcode='"+msg.zip+"',Phone_number='"+msg.phone+"',EmailID='"+msg.email+"'  WHERE SSN='"+msg.guardid+"';";
	var qry2="UPDATE guard SET No_of_Hours_perday='"+msg.totalhours+"',Building_ID='"+msg.buildingid+"',DateofJoining='"+msg.sdate+"',LastDay='"+ msg.ldate+"' WHERE Guard_ID='"+msg.guardid +"'" ;
	
	var qry=qry1+qry2;
	
	mysql.handle_database(function(err,results){

		if(err){
			console.log(err);
			throw err;
		}
		else 
		{
			console.log("In submitAlertPage Output");
			callback(null, results);

		}
	},qry);

}
exports.update = update;



function PopulateBuildingClient(msg, callback){

	var res = {};
	
	
	var qry1=" Call SelectBuildingClientID() ";
	
	
	mysql.handle_database(function(err,results){

		if(err){
			console.log(err);
			throw err;
		}
		else 
		{
			console.log("In submitAlertPage Output");
			callback(null, results);

		}
	},qry1);

}
exports.PopulateBuildingClient = PopulateBuildingClient;

function GuardDetails(msg, callback){
	console.log("In Server GuardDetails");
	var res = {};
	var qry1="call GuardDetails('"+msg.id+"')";
	console.log();
	mysql.handle_database(function(err,results){

		if(err){
			console.log(err);
			throw err;
		}
		else 
		{
			console.log("In GuardDetails Output");
			callback(null, results);

		}
	},qry1);

}
exports.GuardDetails = GuardDetails;