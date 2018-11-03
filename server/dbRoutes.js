const express = require('express');
const { User, Favorite } = require('../models/schema');
const dbRouter = express.Router();

// function restrict(req, res, next) {
//   if (req.session.passport.user) {
//     next();
//   } else {
//     console.log('Access denied!');
//     // redirect to landing page properly
//     res.redirect('/');
//   }
// }

// dbRouter.use(restrict);


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

dbRouter.post('/', async (req, res) => {
    const newFavorite = req.body;
    try{
      const user = await User.query().where('username', req.session.passport.user)
      const user_id = user[0].id
      await Favorite.query().insert({
        location: newFavorite.address,
        description: newFavorite.description,
        category: newFavorite.category,
        public: newFavorite.public,
        coordinates: JSON.stringify({latitude: newFavorite.latitude, longitude: newFavorite.longitude}),
        user_id
      })
      res.status(201).send('post successful');
    }
    catch (err) {
      console.log(`error in dbRoute post new favorite for user: ${err}`);
      res.sendStatus(500);
    }
});

dbRouter.delete('/', async(req, res) => {
  const id = req.body.favId
  try {
    if(!id) {
      throw new Error('No favorite ID found');
    }
    //const user_id = req.session.passport.userid;
    await Favorite.query()
      .where({
        //user_id,  re-enable once userid gets into server session
        id
      })
      .del();
    res.status(201).send('Deletion successful');
  } 
  catch (err) {
    console.log(`Error in DB removal "${err.name}": ${err.message}`);
    res.sendStatus(500);
  }
})


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