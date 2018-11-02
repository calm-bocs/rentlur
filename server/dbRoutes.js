const express = require('express');
const { User, Favorite } = require('../models/schema');
const dbRouter = express.Router();
//dotenv allows access to .env files when deploying
//require('dotenv').config()

function restrict(req, res, next) {
  if (req.session.passport.user) {
    next();
  } else {
    console.log('Access denied!');
    // redirect to landing page properly
    res.redirect('/');
  }
}

dbRouter.use(restrict);


// MAKE SURE THAT ALL OF THESE ROUTES ARE PROTECTED/REQUIRES A SESSION
/*
queries the user table for an id contained in the session
  then grabs the favorites that share that id and returns them in an array
*/
// once session is working, re-add if/else statement
// cahnge function to not return entire result including hashed password
dbRouter.get('/', async (req, res) => {
  console.log(`in database get favorites by user query`)  
  try {
    const user = await User.query().where('username', req.session.passport.user)
    const favorites = await user[0].$relatedQuery('favorite')
    res.status(200).json(favorites);
  }
  catch (err) {
    console.log(`error in dbRoute get  favorites for user: ${err}`);
    res.sendStatus(500);
  }
});

//  return all results from favorites marked public
dbRouter.get('/public', (req, res) => {
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
dbRouter.post('/', async (req, res) => {
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

module.exports = dbRouter;