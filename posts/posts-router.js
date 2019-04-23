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
router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
  Posts
  .find()
  .then( post => {
    res.status(200).json(post);
  })
  .catch( err => {
    return sendError( 'The posts information could not be retrieved.', err );
  })
})

//return a specific id requested data
router.get('/:id', async (req, res) => {
  //set the id 
  const Id = req.params.id;
  Posts
  .findById(Id)
  .then( post => {
    if (post == 0) {
      return sendMissingID(res);
    }
    else {
      return res.status(200).json(post);
    }
  })
  .catch( err => {
    return sendError( 'The posts information could not be retrieved.', err );
  })
})

// delete the selected item by id
router.delete('/:id', (req, res) => {
  //set the id 
  const Id = req.params.id;
  Posts.findById(Id)
  .then(post => {
    if (post == 0) {
      return sendMissingID(res);
    }
    else {
      return res.status(200).json(post);
    }
  })
  .catch( err => { 
    return sendError('oops', err)
  })
  Posts
  .remove(Id)
  .then( post => {
    if (post == 0) {
      return sendMissingID(res);
    }
    else {
      return res.status(200).json(post);
    }
  })
  .catch( err => {
    return sendError( 'The post could not be removed.', err );
  })
})

//making a put request
router.put('/:id', (req, res) => {
  //set id
  const Id = req.params.id

  //add request body
  const { title, contents } = req.body;
  const posted = { title, contents };

  //check the req.body
  if ( !title || !contents ) {
    return res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
  }
  Posts
  .update(Id, posted)
  .then( post => {
    if (post == 0) {
      return sendMissingID(res);
    }
    else {
      post = {...post, posted}
      return res.status(201).json(post);
    }
  })
  .catch( err => {
    return sendError( 'The post information could not be modified.', err );
  })
})

//export the route 
module.exports = router