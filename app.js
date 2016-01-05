


var express = require('express')
  , index = require('./routes/index')
  
  , http = require('http')
  , path = require('path')
 , mysql=require('mysql')
, session = require('client-sessions');
 


var app = express();
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({   
	  
	cookieName: 'session',    
	secret: 'cmpe273_test_string',    
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,  }));



//configuration
app.configure(function(){
  app.set('port', process.env.PORT || 4800);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});
//Development
app.configure('development', function(){
  app.use(express.errorHandler());
});
// homepage 
app.get('/', index.homePage);
//login page
app.post('/login', index.login);
//signup
app.post('/signup', index.signup);
//About 
app.post('/about', index.about);
//Interest
app.post('/interest', index.interest);
//back to login 
app.post('/Homelogin', index.Homelogin);
//logout
app.post('/logout',index.logout);
//group 
app.get('/showgroup', index.showgroup);
//group details
app.get('/groupname/:name', index.groupss);
//create group
app.post('/creategroup',index.creategroup);
//Add member
app.get('/groups/add',index.Addmember);
//Delete member
app.get('/groups/delete',index.Deletemember);
//Delete Group
app.post('/deletegroup',index.deletegroup);
//Add Friend
app.get('/AddFriend', index.AddFriend);
//Accept Friend
app.get('/AcceptFriend',index.AcceptFriend);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
