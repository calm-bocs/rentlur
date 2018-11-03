/*
OVERVIEW OF ROUTER END GOAL:

root url:
  - Landing component (HTML 5 pulled in from website)
    - links to login (links to signup)
    - links to singup (links to login)
    Notes: 
      - Landing component will contain top-level logic and functionality for login and signup views
        - including call to server to authorize
      - success cases for login/signup server call will redirect to Home view
Home view will be a component that always renders a tab bar (material UI) and the map
  - will contain a switch that has two routes that render form/option select accordingly
    - /user
    - /public
*/

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch, withRouter } from 'react-router-dom';

// components
// import Search from './components/Search.jsx';
// import List from './components/List.jsx';
// import SavedRentals from './components/SavedRentals.jsx';
// import NavBar from './components/NavBar.jsx';
// import Details from './components/Details.jsx';
// import Background from './components/Background.jsx';
import Navigation from './components/Navigation.jsx'
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Redirector from './components/Redirector.jsx';
import Landing from './components/Landing.jsx';
import Home from './components/Home.jsx';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      userId: 0,
      favorites: [],
      location: location.pathname.includes('public') ? 'public' : 'private',
    };
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.favoritesPublic = this.favoritesPublic.bind(this);
    this.favoritesUser = this.favoritesUser.bind(this);
    // additional bindings for addFavorite, deleteFavorite, filterFavoritesByCategory, etc. once those functions are built out
    this.navigateTo = this.navigateTo.bind(this);
    this.storeFavorite = this.storeFavorite.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
  }
 

  // this is just a test to verify database functionality
  // once refactored, the top level indexjs will likely just be a router to either landing component or home component
  // likely will not have a component did mount called until logged in and on home page
  componentDidMount() {
    //this.dummyFavoritesPublic();
    //this.dummyFavoritesUser();
    // this.setState({
    //   username: sessionStorage.getItem('username') || '',
    //   userId: sessionStorage.getItem('userId') || 0
    // }, () => this.retrieveFavorites());
  }

// signup success now logs user in. need to update login to redirect to home page
  signup(username, password, history) {
    console.log(`signup function called: ${username + password}`)
    axios.post('/api/signup', {username, password})
    .then ((newUserId)=> {
      console.log(newUserId);
      this.login(username, password, history);
    })
    .catch(err => {
      console.log(`error received while trying to sign up: ${err}`)
    })
    }


  // need to update success case to redirect to home page
  login(username, password, history) {
    console.log(`login function called ${username + password}`)
    axios.post('/api/login', {username, password})
    .then ((response) => {
      console.log(`login function success response`, response);
      // alert('Logged In Successfully!');
      // redirect to home page
      // this.setState({
      //   username: response.data.data.username,
      //   userId: response.data.data.id
      // })
      // alert('Logged In Successfully!');
      sessionStorage.setItem('username', response.data.data.username);
      sessionStorage.setItem('userId', response.data.data.id);
      // this.forceUpdate();
      // console.log('Logged in as userId ' + sessionStorage.getItem('userId'));
      this.navigateTo('private', history);

    })
    .catch((err) => {
      console.log(err)
      alert('Incorrect username or password')
    });
  }

  logout() {
    axios.get('/api/logout')
    .then((response) => {
      console.log(`successfully logged out: ${response}`)
      // redirect to login page
      sessionStorage.clear();
      this.forceUpdate();
    })
    .catch(err => {
      console.log(`error logging out: ${err}`)
    })
  }



  // addFavorite(property, user_id = sessionStorage.getItem('userId')) {
  //   console.log(user_id);
  //   axios.post(`api/properties/${user_id}`, property)
  //   .then(result => console.log(result));
  // }

  // deleteFavorite(property_id, user_id = sessionStorage.getItem('userId')) {
  //   axios.delete(`api/properties/${user_id}/${property_id}`)
  //   .then(result => this.retrieveFavorites(user_id));
  // }

  // retrieveFavorites(user_id = sessionStorage.getItem('userId')) {
  //   // check that user id exists before making call
  //   console.log('fetching favorites for ID ' + user_id);
  //   if(user_id) {
  //     axios.get(`api/properties/${user_id}`)
  //     .then(result => {
  //       this.setState({savedRentals: result.data.property});
  //     })
  //     .catch(err => console.log(err));
  //   }
  // }

  navigateTo(location, history) {
    let app = this;
    if(location === 'public') {
      this.setState({location: 'public'});
      history.push('/map/public');
    }
    if(location === 'private') {
      this.setState({location: 'private'})
      history.push('/map/private')
    }
  }

  favoritesPublic() {
    console.log(`making call to server route api/properties/public`);
    axios.get(`/api/favorites/public`)
      .then(response => {
        console.log(`result returned from call to db for public favorites: `, response.data);
        this.setState({favorites: response.data})
      })
      .catch(err => console.log(err));
  }

  favoritesUser() {
    console.log(`making call to server route api/properties/`);
    axios.get(`/api/favorites/`)
      .then(response => {
        console.log(`result returned from call to db for user favorites:`, response.data);
        this.setState({favorites: response.data}, () => {
          console.log('Favorites changed, new favorites:', this.state.favorites)
        })
      })
      .catch(err => console.log(err));
  }

  storeFavorite(favorite) {
    console.log('Attempting to store favorite:', favorite)
    axios.post('/api/favorites', favorite)
      .then(() => this.favoritesUser())
      .catch(err => console.error(err));
  }


  deleteFavorite(favId) {
    console.log(`Attempting to delete favorite ${favId}`);
    axios.delete('/api/favorites', {data: {favId, flag:'|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'}})
      .then((response) => {
        console.log(response);
        this.favoritesUser()
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <BrowserRouter>

      <div>
        <Switch>
          <Route exact path='/'
            render={(props) => <Landing logout={this.logout}/>}
          />
          <Route
            path='/login'
            render={(props) => <Login {...props}
              login={this.login} />}
          />
          <Route
            path='/signup'
            render={(props) => <Signup {...props}
              signup={this.signup} />}
          />
          <Route
            path='/map'
            render={(props) => (
                <Home {...props}
                  deleteFavorite={this.deleteFavorite}
                  favorites={this.state.favorites}
                  getPublic={this.favoritesPublic}
                  getPrivate={this.favoritesUser}
                  logout={this.logout}
                  username={this.state.username}
                  navigateTo={this.navigateTo}
                  location={this.state.location}
                  storeFavorite={this.storeFavorite}/>
              )}
            />

          {/*default path to hide potentially sensitive routes*/}
          <Route
            path='/*'
            render={(props) => <Redirector />}
          />
        </Switch>

        </div>
      </BrowserRouter>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
