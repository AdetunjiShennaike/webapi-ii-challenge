//add the imports for express and cors
const express = require('express');
const cors = require('cors');

//import router file
const postRouter = require('./posts/posts-router');

//set server, cors, and json read/write
const server = express();
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send(`
    <h1> We In Here Brodie! </h1>
  `);
});

//set the url route that will be used with the imported router file
server.use('/api/posts', postRouter);

//export the file to be imported by index.js
module.exports = server;