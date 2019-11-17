const http = require('http');

// laod fs module to get access to local files
const fs = require('fs');

// load special "notes" modules
let notes = require('./notes_data');
const notesLogic = require('./notes_logic'); // will export multiple functions
const deleteNote = notesLogic.deleteNote;
const saveNote = notesLogic.saveNote;
const getList = require('./notes_list'); // will only export single function
const getForm = require('./notes_form');

// load additional module
const formidable = require('formidable');


const server = http.createServer((request, response) => {
  // get current url for navigation through web application
  const parts = request.url.split('/');

  // delete method to remove current note
  if (parts.includes('delete')) {
    notes = deleteNote(notes, parts[2]);
    redirect(response, '/');

  // create new note
  } else if (parts.includes('new')) {
    send(response, getForm());

  // edit exiting note
  } else if (parts.includes('edit')) {
    // will display a web form for user interaction
    send(response, getForm(notes, parts[2]));

  // save new note AND method is POST and not GET
  } else if (parts.includes('save') && request.method === 'POST') {

    // use formidable to handle incoming POST Request and Form Data https://www.npmjs.com/package/formidable
    const form = new formidable.IncomingForm();
    form.parse(request, (err, note, files) => {
      console.log('data', note);
      notes = saveNote(notes, note);
      redirect(response, '/');
    });

  // standard response if images are in url, no special handling is needed, ...
  } else if (parts.includes('images') ) {
    fs.readFile(__dirname + request.url, (err, data) => {
      if (err) {
        response.statusCode = 404;
        response.end();
      } else {
        response.end(data);
      }
    });

  // ... same for styles
  } else if (request.url === '/styles/style.css') {
    // (!) take care, we will use another handling
    fs.readFile(__dirname + request.url, 'utf8', function(err, data) {
      if (err) {
        response.statusCode = 404;
        response.end();
      } else {
        response.end(data);
      }
    });
  } else {
    send(response, getList(notes));
    }
});

// write and send response back to client
function send(response, responseBody) {
  response.writeHead(200, { 'content-type': 'text/html' });
  response.end(responseBody);
}

server.listen(8080, () =>
  console.log('Server and Notes Application is listening to https://localhost:8080'),
);

// redirecting to 'to'-location
function redirect(response, to) {
  response.writeHead(302, { location: '/', 'content-type': 'text/plain' });
  response.end('302 Redirecting to /');
}