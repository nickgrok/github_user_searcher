// Node.js script used to open a web app that searches GitHub user names and returns
// basic user information.

var http = require('http');
var fs = require('fs');

server();

/* server() function constructs a local server at 127.0.0.1 on port 8081 
 * and loads index.html which is a simple single page web app using AJAX. 
 */
function server(){

    const server = http.createServer((request, response) => {
        fs.readFile('index.html', function(err, data) {
            response.statusCode = 200;
            response.setHeader('Content-Type','text/html');
            response.write(data);
            response.end();
        });
    })


    server.listen(8081, '127.0.0.1', () => {
        console.log("Server running at http://127.0.0.1:8081/");
    });
}