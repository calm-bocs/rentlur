const express = require('express');
const cities = require('all-the-cities');
const zipcodes = require('zipcodes');
//This is the scaper
const craigslist = require('node-craigslist');
const router = express.Router();

//Craigslist scraper client instantation.
const craigsList = new craigslist.Client({
  baseHost: 'craigslist.com',
});

// route to /api/search for basic list elements.
router.post('/', (req, res) => {
  // Retrieves the state from the city name of the most populous city by that name
  let cityState = cities.filter(cit => cit.name.match(req.body.city)).sort((a, b) => b.population - a.population)[0].adminCode;

  //gets a generic zipCode if none is given
  let zipCode = zipcodes.lookupByName(req.body.city, cityState);

  // Meant to add more user input but never got around to it.
  // Everything was running on defaults, you may add more functionality this way.
  const baseHost = req.body.baseHost || 'craigslist.org';
  const category = req.body.category || 'hhh';
  const maxAsk = req.body.maxAsk || '50000';
  const minAsk = req.body.minAsk || '0';
  const city = req.body.city.toLowerCase().replace(/\s+/g, '') || 'Austin';
  //Get third zipcode in list trying to find an arbitrarily more "central" ip.
  const postal =  `${zipCode[3].zip}`;
  const searchDistance = req.body.searchDistance || '25';

  //Search Query construction
  const searchQuery = {
    baseHost,
    category,
    city,
    maxAsk,
    minAsk,
    postal,
    searchDistance,
  };

// Search Craigslist
  craigsList.search(searchQuery, '', (err, data) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      res.json(data);
    }
  });
});

//This route: /api/search/details is for getting detail of an individual
//craigslist post. This is what gets you IP banned. 
router.post('/details', (req, res) => {
  const listing = req.body.listing;
  // console.log(listing);
 craigsList.details(listing).then(details => {
  //  console.log('Got details', details);
   res.status(201).json(details);
 })
});

//Export for express router in index. 
module.exports = router;