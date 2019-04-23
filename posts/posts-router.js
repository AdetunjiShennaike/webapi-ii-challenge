//import express and cors
const express = require('express');
const cors = require('cors');

//import the database
const Posts = require('../data/db');

//set router
const router = express.Router();

//make a constant reply for 404 & 500
const sendError = (msg, res) => {
  res.status(500);
  res.json({ errorMessage: `${msg}` })
};

const sendMissingID = (res) => {
  res.status(404);
  res.json({ errorMessage: 'The post with the specified ID does not exist.' });
}

// post to the server
router.post('/', (req, res) => {
  //add request body
  const { title, contents } = req.body;
  const posted = { title, contents };

  //check the req.body
  if ( !title || !contents ) {
    return res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
  }
  Posts
  .insert(posted)
  .then( post => {
    post = {...post, posted}
    res.status(201).json(post);
  })
  .catch( err => {
    return sendError( 'There was an error while saving the post to the database', err );
  })
})

//create a get request for the data
router.get('/', (req, res) => {
  Posts
  .find()
  .then( post => {
    res.status(200).json(post);
  })
  .catch( err => {
    return sendError( 'The posts information could not be retrieved.', err );
  })
})

// | GET    | /api/posts     | Returns an array of all the post objects contained in the database.                                                                                                         |
// | GET    | /api/posts/:id | Returns the post object with the specified id.                                                                                                                              |
// | DELETE | /api/posts/:id | Removes the post with the specified id and returns the **deleted post object**. You may need to make additional calls to the database in order to satisfy this requirement. |
// | PUT    | /api/posts/:id | Updates the post with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**.    





//export the route 
module.exports = router