var express = require('express');
var router = express.Router();
var http = require('http');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/:name',function(req,res,next){
	console.log(req.params.name);
	http.get({
		hostname: 'localhost',
		port: 80,
		path: '/nodejs_test.php',
		agent: false  // create a new agent just for this one request
	}, function(response){
	  	// Do stuff with response
	  	var s='';
	  	response.on('data', function(chunk){
	  		console.log('receive data:'+chunk);
			s+=chunk;
		});
		response.on('end', function(){
			//console.log('No more data in response.')
	  		res.send(JSON.stringify(s));
		});
	}).on('error',function(e){
		console.log('problem with request: ${e.message}');
	});

	/*res.send(JSON.stringify({
		name:req.params.name
		,id:3343
		,email:'homeemail@qq.com'
		,address:'广州市'
		,phone:156222317639
		,disable:false
	}));*/

});
/*
// GET /search?q=tobi+ferret
req.query.q
// => "tobi ferret"

// GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
req.query.order
// => "desc"

req.query.shoe.color
// => "blue"

// ?name=tobi
req.param('name')
// => "tobi"

// POST name=tobi
req.param('name')
// => "tobi"

// /user/tobi for /user/:name 
req.param('name')
// => "tobi"


// POST user[name]=tobi&user[email]=tobi@learnboost.com
req.body.user.name
// => "tobi"

req.body.user.email
// => "tobi@learnboost.com"

// POST { "name": "tobi" }
req.body.name
// => "tobi"


req.get('Content-Type');
// => "text/plain"

req.get('content-type');
// => "text/plain"

req.get('Something');
// => undefined
*/
module.exports = router;
