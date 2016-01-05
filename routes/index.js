var ejs = require("ejs");
var mysql = require('./mysql');
var app=require('../app');
var session=require('client-sessions');
var Emailid,password;
//homepage function
function homePage(req, res){
	  res.render('index');
	  }

//Login Function
function login(req, res)
{	
     var Emailid, password;
	Emailid= req.param("id1");
	password = req.param("id2");
	
	var getUser="select * from login where EmailId='"+Emailid+"' and Password='"+password+"'";
	console.log("Query is:"+getUser);
	
mysql.fetchData(function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				if(results.length > 0){
					console.log("valid Login");
					req.session.Emailid=Emailid;
					req.session.password=password;
					ejs.renderFile('./views/successLogin.ejs', { data: results } , function(err, result) {
				        
				        if (!err) {
				            res.end(result);
				        }
				        
				        else {
				            res.end('An error occurred');
				            console.log(err);
				        }
				    });
				}
				else {    
					
					
					console.log("vale is getting inserted");
					ejs.renderFile('./views/failLogin.ejs',function(err, result) {
				        
				        if (!err) {
				            res.end(result);
				        }
				        
				        else {
				            res.end('An error occurred');
				            console.log(err);
				        }
				    });
				}
			}  
		},getUser);
	}
//signup function
function signup(req,res){
	
var query1 = "INSERT INTO myschema.login (EmailId, Password, firstname, lastname,DateOfBirth,sex) VALUES ('"+req.param("Email")+"', '"+req.param("passwd")+"', '"+req.param("fname")+"' , '"+req.param("lname")+"', '"+req.param("dob")+"','"+req.param("sex")+"')";
     
		
mysql.fetchData(function(err,results){
	if(err){
		throw err;
	}
	else 
	{
		res.render("../views/successsignup.ejs", { port: '3000' }  );
					   
			
	}
},query1);
}

			
		

//About Function

function about(req,res){
	var EMAILID=req.session.Emailid;
	if(req.session.Emailid)
	{
	    
	var xyz="select * from about where EmailId='"+EMAILID+"'";		

	console.log("Query is:"+xyz);

	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("About Information is there");
				
				ejs.renderFile('./views/successabout.ejs', { data: results } , function(err, result) {

			
			        if (!err) {
			            res.end(result);
			        }
			       
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
			else {    
				
				console.log("Nothing is there to show in about");
				ejs.renderFile('./views/failedabout.ejs',function(err, result) {
			       
			        if (!err) {
			            res.end(result);
			        }
			        
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
		}  
	},xyz);
}
}
//Interest function
function interest(req,res){
	var EMAILID1=req.session.Emailid;
	
	if(req.session.Emailid)
	{
	    
	var myinterest="select * from interest where EmailId='"+EMAILID1+"'";		

	console.log("Query is:"+myinterest);

	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("Interest");
				
				ejs.renderFile('./views/successinterest.ejs', { data: results } , function(err, result) {

			
			        if (!err) {
			            res.end(result);
			        }
			        
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
			else {    
				
				console.log("Nothing ");
				ejs.renderFile('./views/failLogin.ejs',function(err, result) {
			        
			        if (!err) {
			            res.end(result);
			        }
			        
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
		}  
	},myinterest);
}
}

//Return to Login Page
function Homelogin(req,res)
{
	
    var Emailid2, password2;
	Emailid2= req.session.Emailid;
	password2=req.session.password;
	
	var getUser1="select * from login where EmailId='"+Emailid2+"' and Password='"+password2+"'";
	console.log("Query is:"+getUser1);
	
	
mysql.fetchData(function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				if(results.length > 0){
					console.log("valid Login");
					
					ejs.renderFile('./views/successLogin.ejs', { data: results } , function(err, result) {
				        
				        if (!err) {
				            res.end(result);
				        }
				        
				        else {
				            res.end('An error occurred');
				            console.log(err);
				        }
				    });
				}
				else {    
					
					
					console.log("vale is getting inserted");
					ejs.renderFile('./views/failLogin.ejs',function(err, result) {
				        
				        if (!err) {
				            res.end(result);
				        }
				        
				        else {
				            res.end('An error occurred');
				            console.log(err);
				        }
				    });
				}
			}  
		},getUser1);
	}

	
	
		
		
		
		
		//group finction
		
		exports.groupss = function(req, res){
	
	
	var Emailid = req.session.Emailid;
	var atrName = req.params.name;
	console.log("The username is: "+Emailid+" and the groupName is: "+atrName);
	var groupName = atrName.replace(/-/g, ' ');
	console.log(groupName);
	if (req.session.Emailid && groupName!==''){
	var groupMembersQuery = "select * from myschema.groupdetails natural join myschema.memberdetails where GroupName= '"+ groupName +"'";
	console.log("Existing Groups Query is: "+groupMembersQuery);

	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("Displaying Existing Groups Members");
				req.session.groupid = results[0].GroupId;
				console.log(req.session.groupid);
				ejs.renderFile('./views/successsfinal.ejs',  { data: results } , function(err, result) {
					
					 if (!err) {
				            res.end(result);
				        }
				        
				        else {
				            res.end('An error occurred');
				            console.log(err);
				        }
					
				});
				
			}}
			},groupMembersQuery);
	}};
	//show group function
	exports.showgroup=function(req,res){
			
		     var name= req.session.Emailid;
			if(req.session.Emailid){
			var getUser3="select * from myschema.groupdetails natural join myschema.memberdetails where MemberName='"+ name +"'";
			console.log("Query is:"+getUser3);
			
		mysql.fetchData(function(err,results){
					if(err){
						throw err;
					}
					else 
					{
						if(results.length > 0){
							console.log("valid Login");
							
							ejs.renderFile('./views/suceessgroup.ejs', { data: results } , function(err, result) {
						        
						        if (!err) {
						            res.end(result);
						        }
						        
						        else {
						            res.end('An error occurred');
						            console.log(err);
						        }
						    });
						}
						else {    
							
							
							console.log("No group available");
							ejs.renderFile('./views/failLogin.ejs',function(err, result) {
						        
						        if (!err) {
						            res.end(result);
						        }
						        
						        else {
						            res.end('An error occurred');
						            console.log(err);
						        }
						    });
						}
					}  
				},getUser3);
			}
			};
			//Add member function
			exports.Addmember = function(req,res){
		
					
						
						var emailid = req.param("groupmember");
						var Emailid = req.session.Emailid;
						
						
						
						
						
						if (req.session.Emailid){
							 groupid=req.session.groupid;
							
							if (req.session.groupid){
							
						var adding = "insert into myschema.memberdetails (GroupId , MemberName) VALUES ('"+ groupid +"', '"+ emailid +"');";
						console.log("Add Member Query is: "+adding);

						mysql.fetchData(function(err,results){
							if(err){
								throw err;
							}
							else 
							{
									
								res.redirect('/showgroup');
									
								}
								},adding);
						}};
						}
				
				//Delete member function
			exports.Deletemember = function(req, res){
				
					
					var emailid = req.param("groupmember");
					console.log("Email ID is"+ emailid);
					var Emailid = req.session.Emailid;
					
					if (req.session.Emailid){
						var groupid = req.session.groupid ;
						
						if (req.session.groupid){
						
					var deleting = "DELETE FROM myschema.memberdetails WHERE GroupId ='"+ groupid +"' && MemberName = '"+ emailid +"'"; 
						
					console.log("Delete Member Query is: "+deleting);

					mysql.fetchData(function(err,results){
						if(err){
							throw err;
						}
						else 
						{
								
							res.redirect('/showgroup');
								
							}
							},deleting);
					}};
			}
			//Delete Group function
			exports.deletegroup = function(req, res){
				
					
					var Emailid = req.session.Emailid;
					

					
					var groupname = req.param("groupname");
					if (req.session.Emailid){
						var groupid= req.session.groupid ;
						if (req.session.groupid){
					

					var deletingGroup =  "DELETE FROM myschema.groupdetails WHERE GroupId ='"+ groupid +"' && GroupName = '"+ groupname +"'";
						
					console.log("Delete Groups Query is :"+ deletingGroup);

					mysql.fetchData(function(err,results){
						if(err){
							throw err;
						}
						else 
						{
							res.redirect('/showgroup');
								
							}	
					},deletingGroup);	
						}};
			}
//Creating a group
			exports.creategroup = function(req, res){
				
					
					var Emailid = req.session.username;
					console.log(req.session.username);
					
					var group_name = req.param("groupname");
					if (req.session.Emailid){
					
					

					var creatingroup =  "INSERT INTO myschema.groupdetails(GroupName) VALUES ('"+group_name+"');";
					console.log("New Groups Query is :"+ creatingroup);

					mysql.fetchData(function(err,results){
						if(err){
							throw err;
						}
						else 
						{
							res.redirect('/showgroup');
							}	
					},creatingroup);	
					
						
					
			}};
			// Adding a friend function
			
			exports.AddFriend = function(req,res){
			var Emailid = req.session.Emailid;
			

			
			var friendname= req.param("ffriend");
			if (req.session.Emailid){
				
			

			var sendfndre =  "insert into myschema.friends (EmailId1, EmailId2, status) values ('"+Emailid+"','"+friendname+"','1')";
				
			console.log("Adding Friend Query is :"+sendfndre );
			

		mysql.fetchData(function(err,results){
				if(err){
					throw err;
				}
				else 
				{
					res.send("successfully sent friend request to "+friendname);
					}	
			},sendfndre);
				}};
		//Accepting a function
		exports.AcceptFriend = function(req,res){	
			var Emailid = req.session.Emailid;
		console.log(req.session.Emailid);
		
		
		if (req.session.Emailid){
		
		

		var acceptfnd=  " UPDATE myschema.friends SET status=2 where EmailId1='"+Emailid+"'";
		console.log("New Groups Query is :"+ acceptfnd);

		mysql.fetchData(function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				res.send("successfully added friend to the group");
				}	
		},acceptfnd);
		
		}};
		
		

	//Logout function			

	exports.logout = function(req,res)
	{
		req.session.destroy();
		res.redirect('/');
	};
			
			
exports.Homelogin=Homelogin;
exports.homePage = homePage;
exports.login = login;
exports.signup=signup;
exports.about=about;
exports.interest=interest;
