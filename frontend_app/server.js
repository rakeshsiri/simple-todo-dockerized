var http = require('http');
var fs = require('fs');

function send404response(response) {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.write("page not found");
    response.end();
}
function onRequest(request, response) {
    if (request.method == "GET" && request.url == '/') {
        response.writeHead(200, { "Content-Type": "text/html" });
        fs.createReadStream("./index.html").pipe(response);
    } else if (request.method == "GET" && request.url == '/styles.css') {
        response.writeHead(200, { "Content-Type": "text/css" });
        fs.createReadStream("./styles.css").pipe(response);
    } else if (request.method == "GET" && request.url == '/script.js') {
        response.writeHead(200, { "Content-Type": "text/javascript" });
        fs.createReadStream("./script.js").pipe(response);
    } else {
        send404response(response);
    }
}

http.createServer(onRequest).listen(3000)

console.log('the server is running...on 3000', `http://localhost:3000`);