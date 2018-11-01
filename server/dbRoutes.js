const express = require('express');
const { User, Favorite } = require('../models/schema');
const router = express.Router();
//dotenv allows access to .env files when deploying
//require('dotenv').config()


/*
queries the user table for an id contained in the session
  then grabs the favorites that share that id and returns them in an array
*/
// once session is working, re-add if/else statement
router.get('/', (req, res) => {
  console.log(req.session);
  // if (isNaN(req.session.UserId)) {
  //   console.log('Malformed user ID');
  // } else {
    User.query().findById(1).eager('favorite')
      .then(result => 
        res.status(200).json(result))
      .catch(err => {
        console.log(`error in dbRoute get favorites for user ${req.session}: ${err}`)
        res.sendStatus(500);
      })
  }
);

//  return all results from favorites marked public
router.get('/public', (req, res) => {
    Favorite.query().where('public', true)
    .then(result => 
      res.status(200).json(result))
    .catch(err => {
      console.log(`error in dbRoute get public favorites: ${err}`)
      res.sendStatus(500);
      })
  }
);


/*
async await version for posting to the favorites table
might be necessary to keep it as an async await to use the $relatedQuery method
sends a query to check for the user id
  puts the saved data into the favorites table with the user_id column set to the user that saved
  only allows insert of the named properties
*/
// access userId by req.session.id - uncomment user line when auth worked out
router.post('/', async (req, res) => {
  console.log(req.session);
  //const user = await User.query().findById(req.session.id)
  console.log(req.body);
  try {
    // await user.$relatedQuery('favorite')
    // .allowInsert('[pid, location, title, price, url, hasPic, date, category]')
    // .insert(req.body);
    res.status(201).send('post successful');
  }
  catch (err) {
    console.log(`error in dbRoute post new favorite: ${err}`);
    res.sendStatus(500);
  }
});


/*
async await version for deleting from the properties table
sends a query to check for the user id
  removes the saved data from the properties table where the user is the one who clicked on the remove button
*/
// router.delete('/:UserId/:propertyId', async (req, res) => {
//   const user = await User.query().findById(req.params.UserId)
//   await user.$relatedQuery('property')
//     .deleteById(req.params.propertyId)
//   res.send('Deleted')
// });

module.exports = router;