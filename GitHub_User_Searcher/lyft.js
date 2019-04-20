'use strict';
var https = require('https');
var http = require('http');
var fs = require('fs');

// 'user' variable stores username being searched
var user = "github";

// 'output' stores the un-parsed data that is loaded by the API
var output = "";

// Prompt user for github login to search
console.log("GitHub User Name ('github' is default): ");

// Input variable sets user variable to selected user instead of default "github" user 
var input = process.openStdin().addListener("data", function(d) {
	user = d.toString().trim();
	});

// Delay testUser call for 4.5 seconds to allow user to input GitHub user and make sure a regex was entered
setTimeout(function(){testUser()}, 4500);

// Delay the parser call for 5 seconds in order to allow user to input GitHub user name
setTimeout(function(){parser(user)}, 5000);

// Delay the server call for an additional .5 seconds in order to allow parser to parse correct user account
setTimeout(function(){server()}, 5500);

/* testUser() function tests if the user entered is a regular expression and if not it
 * changes back to the default user 'github'
 *
*/
function testUser(){
	if(/^\s*$/.test(user))
	{
		user = "github";
	};
	console.log("Loading GitHub User '" + user + "'");
} 

/* parser() function gets host and path for GitHub user API and applies the 'user' variable 
 * This function should 'GET' the API for the chosen user name and return it to the local server site 
 * 127.0.0.1 at port 8081
 */
function parser(user){

	var options = {
	    host: 'api.github.com',
	    path: '/users/'+user,
	    headers: {'User-Agent': 'request'}
		};

		https.get(options, function (res) {
		    res.on('data', function (chunk) {
		        output += chunk;
	  });
	    
	}).on('error', function (err) {
	      console.log('Error:', err);
	});
}

/* server() function constructs a local server, parses the global 'output' data and
 * displays it on the local server address.  Also, the address is identified in the
 * command line so the user can quickly access the parsed JSON data from GitHub. 
 */
function server(){
	const server = http.createServer((req, res) => {
    	res.statusCode = 200;
    	res.setHeader('Content-Type', 'text/html');
    	try {
            var data = '';
            data = JSON.parse(output);
            //console.log(data);
            var s3url = JSON.stringify(data.avatar_url);
            var img = "<img src="+s3url+" height=\"200\" width=\"200\">";
            
                res.end( "<h1>"+data.name+"</h1>" + "<br><br>" +
            	img + 
        		"<br><br>" +
        		"User Name: " + data.login +
        		"<br><br>" +
    			"Type: " + data.type +
    			"<br><br>" +
    			"Number of repos: " + data.public_repos +
    			"<br><br>" +
    			"No. Followers: " + data.followers +
    			"<br><br>" +
    			"No. Following: " + data.following + 
    			"<br><br>" +
    			"Website: " + "<a href="+data.blog+">"+data.blog + "</a>" +
    			"<br><br>" +
    			"Email: " + "<a href="+ "mailto:"+data.email+">" + data.email + "</a>" +
    			"<br><br>" +
    			"Biography: " + data.bio
    			);   
	    		        
            } catch (e) {
                res.end('Error parsing JSON!');
            }
        });

	server.listen(8081, '127.0.0.1', () => {
		console.log("Server running at http://127.0.0.1:8081/");
	});
}




