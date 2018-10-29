import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components
import List from './components/List.jsx';
import SavedRentals from './components/SavedRentals.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Details from './components/Details.jsx';
import Navigation from './components/Navigation.jsx'
import cities from '../data/cities.js';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      userId: 0,
      rentals: [],
      savedRentals:[],
      details: [],
      //cities was originally inserted to verify if the city has a craigslist subdomain
      //It was never implemented though. 
      cities: cities,
    };
    this.searchProperties = this.searchProperties.bind(this);
    this.retrieveDetails = this.retrieveDetails.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.retrieveFavorites = this.retrieveFavorites.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
  }
 

  componentDidMount() {
    this.setState({
      username: sessionStorage.getItem('username') || '',
      userId: sessionStorage.getItem('userId') || 0
    });
    this.retrieveFavorites();
  }


// search api for properties
  searchProperties(searchQuery) {
    axios.post('/api/search', {city: searchQuery}).then((response) => {
      this.setState({ rentals: response.data });
    });
  }

// get details on click (listitem component)
  retrieveDetails(listing){
    this.setState({
      details: listing
    });
    axios.post('/api/search/details',{listing})
    .then(details => {
      const combined = Object.assign(details.data, listing);
      this.setState({details: combined});
    });
  }


// login function, updating session
  login(usr, pss) {
    axios.post('/api/login', {username: usr, password: pss})
    .then ((response)=> {
      this.setState({
        username: response.data.data.username,
        userId: response.data.data.id
      })
      alert('Logged In Successfully!');
      sessionStorage.setItem('username', response.data.data.username);
      sessionStorage.setItem('userId', response.data.data.id);
    })
    .catch((err) => alert('Incorrect username or password'));
  }

// logout function, resetting state and clearing session
  logout() {
    this.setState({
      username: '',
      userId: 0
    });
    sessionStorage.clear();
  }


// add fav (list item comp)
  addFavorite(property, user_id = sessionStorage.getItem('userId')) {
    axios.post(`api/properties/${user_id}`, property)
    .then(result => console.log(result));
  }

// delete fav (SavedRentalItem comp)
  deleteFavorite(property_id, user_id = sessionStorage.getItem('userId')) {
    axios.delete(`api/properties/${user_id}/${property_id}`)
    .then(result => this.retrieveFavorites(user_id));
  }

  // retrieve saved favs, on comopnent did mount
  retrieveFavorites(user_id = sessionStorage.getItem('userId')) {
    axios.get(`api/properties/${user_id}`)
    .then(result => {
      this.setState({savedRentals: result.data.property});
    });
  }

// router
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation search={this.searchProperties} username={this.state.username} logout={this.logout}/>
          <div className='main'> 
            <Switch>
              <Route exact path='/' 
                render={(props) => <List {...props} 
                retrieve={this.retrieveDetails} 
                details={this.state.details} 
                rentals={this.state.rentals} 
                fav={this.addFavorite} 
                username={this.state.username}/>
              }/>
              <Route path='/saved-rentals' 
                render={(props) => <SavedRentals {...props} 
                saved={this.state.savedRentals} 
                favs={this.retrieveFavorites} 
                details={this.retrieveDetails} 
                delete={this.deleteFavorite}/>
                }/>
              <Route 
                path='/login' 
                render={(props) => <Login {...props} 
                login={this.login} />}
              />
              <Route 
                path='/signup' 
                component={Signup}
                />
              <Route   
                path='/details'
                render={(props) => <Details {...props} 
                details={this.state.details} />}
              />

            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
