const express = require('express');
//Pulled from schema to access relations between tables (check objection docs if you have any questions https://vincit.github.io/objection.js/#getting-started)
const { User, Property } = require('../models/schema');
//router runs from the index.js file to keep it clean
const router = express.Router();
//dotenv allows access to .env files when deploying
//require('dotenv').config()


/*
queries the user table for a specific passed in id
  then grabs the properties that share that id in a array form
*/
router.get('/:UserId', (req, res) => {
  if (isNaN(req.params.UserId) ) {
    res.status(300).send('Malformed user ID');
  } else {
    User.query().findById(req.params.UserId).eager('property')
      .then(result => res.json(result))
      .catch(err => {
        console.log('Error finding user favorites:\n', err)
        res.status(500).send();
      })
  }
});


/*
async await version for posting to the properties table
might be necessary to keep it as an async await to use the $relatedQuery method
sends a query to check for the user id
  puts the saved data into the properties table with the user_id column set to the user that saved
  only allows insert of the named properties
*/
router.post('/:UserId', async (req, res) => {
  const user = await User.query().findById(req.params.UserId)
  await console.log(req.body);
  await user.$relatedQuery('property')
    .allowInsert('[pid, location, title, price, url, hasPic, date, category]')
    .insert(req.body)
   res.status(201).send('post successful');
});


/*
async await version for deleting from the properties table
sends a query to check for the user id
  removes the saved data from the properties table where the user is the one who clicked on the remove button
*/
router.delete('/:UserId/:propertyId', async (req, res) => {
  const user = await User.query().findById(req.params.UserId)
  await user.$relatedQuery('property')
    .deleteById(req.params.propertyId)
  res.send('Deleted')
});

module.exports = router;