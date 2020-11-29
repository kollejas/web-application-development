//use fs to access the file system
const fs = require('fs');

// write and send response back to client
function send(response, responseBody) {
    response.writeHead(200, { 'content-type': 'text/html' });
    response.end(responseBody);
}

// send all other static files to client
function sendFile(response, request, encoding = ''){
    fs.readFile(__dirname + request.url, encoding, function (err, data) {
        if (err) {
            response.statusCode = 404;
            response.end();
        } else {
            response.end(data);
        }
    });
}

// redirecting to 'to'-location
function redirect(response, to) {
    response.writeHead(302, { location: '/', 'content-type': 'text/plain' });
    response.end('302 Redirecting to /');
}


module.exports = {
    send,
    sendFile,
    redirect
}