//with connection pooling 
var ejs= require('ejs');
var mysql = require('mysql');
var arrayOfPools= [];


function getConnection(){
	var connection = mysql.createConnection({
		host : 'localhost', 
		user : 'root',
		password : 'pawan',
		database : 'myschema',
	    port	 : 3306
	});
	return connection;
}
for(var i=0;i<10;i++){
	var connection=getConnection();
	arrayOfPools.push(connection);
}
function getConnectionFromPool(){
	var connection = arrayOfPools.pop();
	return connection;
}
function releaseConnectionFromPool(connection){
	arrayOfPools.push(connection);
}
function fetchData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnectionFromPool();
	console.log('connected as id ' + connection.threadId);
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			releaseConnectionFromPool(connection);
			callback(err, rows);
		}
	});
	
}	

exports.fetchData=fetchData;













//without connection pooling this code will be used

/*var ejs= require('ejs');
var mysql = require('mysql');

function getConnection(){
	var connection = mysql.createConnection({
	    host     : 'localhost',
	    user     : 'root',
	    password : 'pawan',
	    database : 'myschema',
	    port	 : 3306
	});
	return connection;
}


function fetchData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnection();
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}	

exports.fetchData=fetchData; */