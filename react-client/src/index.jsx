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
//import MapContainer from './components/MapContainer.jsx';
import Redirector from './components/Redirector.jsx';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // don't need to keep any state here...
      // username: '',
      // userId: 0,
    };
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.dummyFavoritesPublic = this.dummyFavoritesPublic.bind(this);
    this.dummyFavoritesUser = this.dummyFavoritesUser.bind(this);
    // additional bindings for addFavorite, deleteFavorite, filterFavoritesByCategory, etc. once those functions are built out
  }
 

  // this is just a test to verify database functionality
  // once refactored, the top level indexjs will likely just be a router to either landing component or home component
  // likely will not have a component did mount called until logged in and on home page
  componentDidMount() {
    this.login('Chris', 'Chris');
    // this.setState({
    //   username: sessionStorage.getItem('username') || '',
    //   userId: sessionStorage.getItem('userId') || 0
    // }, () => this.retrieveFavorites());
  }

// signup success now logs user in. need to update login to redirect to home page
  signup(username, password) {
    console.log(`signup function called: ${username + password}`)
    axios.post('/api/signup', {username, password})
    .then ((newUserId)=> {
      console.log(newUserId);
      this.login(username, password);
    })
    .catch(err => {
      console.log(`error received while trying to sign up: ${err}`)
    })
    }
  

  // need to update success case to redirect to home page
  login(username, password) {
    console.log(`login function called ${username + password}`)
    axios.post('/api/login', {username, password})
    .then ((response) => {
      console.log(`login function success response`, response);
      // alert('Logged In Successfully!');
      // redirect to home page
      this.dummyFavoritesUser();
    })
    .catch((err) => alert('Incorrect username or password'));
  }

  logout() {
    axios.get('/api/logout')
    .then((response) => {
      console.log(`successfully logged out: ${response}`)
      // redirect to login page
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


    dummyFavoritesPublic() {
    console.log(`making call to server route api/properties/public`);
      axios.get(`api/favorites/public`)
      .then(data => 
        console.log(`result returned from call to db for public favorites: ${JSON.stringify(data)}`)  
      )
      .catch(err => console.log(err));
    }

    dummyFavoritesUser() {
      console.log(`making call to server route api/properties/`);
        axios.get(`api/favorites/`)
        .then(data => 
          console.log(`result returned from call to db for user favorites: ${JSON.stringify(data)}`)  
        )
        .catch(err => console.log(err));
      }


  // this will all be refactored, likely according to the plan outlined at the top of the document
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation username={this.state.username} logout={this.logout}/>
          <div className='main'> 
          <Switch>
            <Route exact path='/' render={(props) => { 
              return (
                <div>
                </div>
              )
            }} />
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
            {/* <Route path='/map' render={(props) => {
              if(sessionStorage.getItem('userId')) {
                return <MapContainer {...props}/>
              } else {
                return <Redirector />
              }
            }} /> */}
            {/*default path to hide potentially sensitive routes*/}
            <Route 
              path='/*'
              render={(props) => <Redirector />}
            />
          </Switch>
          </div>
        </div>
      </BrowserRouter>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
