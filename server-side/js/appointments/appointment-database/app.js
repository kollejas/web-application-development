//HTTP module allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP).
const http = require("http");

// initialize model object
let model = require("./model"); // will export several functions, in this case a complete database model

// init helper module with some useful functions
const helper = require("./helper");
const send = helper.send;
const sendFile = helper.sendFile;

// creates Overview List with HTML
const view = require("./views/list");
const getList = view.getList;
const getError = view.getError;

// entry point for each Request to create matching response
//Any node web server application will at some point have to create a web server object. This is done by using [createServer]
const server = http.createServer((request, response) => {
  if (request.url === "/styles/style.css") {
    sendFile(response, request, "utf8");

    // standard request case, show list view
  } else {
    model.getAll().then(
      (milestone) => {
        send(response, getList(milestone));
      },
      //(error) => send(response, error)
      (error) =>  {
        send(response, getError(error));

      }
    ).catch(error => {
      console.error("error ", error);
    });
  }
});

// server is now listening to specific port
server.listen(8080, () =>
  console.log(
    "Server and Notes Application is listening to https://localhost:8080"
  )
);
