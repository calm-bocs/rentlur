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
import MapContainer from './components/MapContainer.jsx';
import Redirector from './components/Redirector.jsx';

// Material UI
// import AppBar from '@material-ui/core/AppBar';
// import Grid from '@material-ui/core/Grid';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      userId: 0,
      favorites: [],
      savedRentals:[],
      details: [],
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    //this.searchProperties = this.searchProperties.bind(this);
    // this.signup = this.signup.bind(this);
    //this.addFavorite = this.addFavorite.bind(this);
    //this.retrieveFavorites = this.retrieveFavorites.bind(this);
    //this.deleteFavorite = this.deleteFavorite.bind(this);
    this.dummyFavoritesPublic = this.dummyFavoritesPublic.bind(this);
    this.dummyFavoritesUser = this.dummyFavoritesUser.bind(this);
  }
 
  // to be completed later

  componentDidMount() {
    //this.dummyFavoritesPublic();
    //this.dummyFavoritesUser();
    // this.setState({
    //   username: sessionStorage.getItem('username') || '',
    //   userId: sessionStorage.getItem('userId') || 0
    // }, () => this.retrieveFavorites());
  }

  // searchProperties(searchQuery) {
  //  console.log(searchQuery);
  //   axios.post('/api/search', {city: searchQuery}).then((response) => {
  //     this.setState({ rentals: response.data });
  //   });
  // }

  login(usr, pss, history) {
    axios.post('/api/login', {username: usr, password: pss})
    .then ((response)=> {
      this.setState({
        username: response.data.data.username,
        userId: response.data.data.id
      })
      alert('Logged In Successfully!');
      sessionStorage.setItem('username', response.data.data.username);
      sessionStorage.setItem('userId', response.data.data.id);
      console.log('Logged in as userId ' + sessionStorage.getItem('userId'));
      history.push('/map/private');
    })
    .catch((err) => alert('Incorrect username or password'));
  }

  logout() {
    this.setState({
      username: '',
      userId: 0
    });
    sessionStorage.clear();
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
        axios.get(`/api/favorites/`)
        .then(response => {
          console.log(`result returned from call to db for user favorites:`, response.data);
          this.setState({favorites: response.data.favorite}, () => {
            console.log('Favorites changed, new favorites:', this.state.favorites)
          })
        })
        .catch(err => console.log(err));
      }


  
  retrieveDetails(listing){

    this.setState({
      details: listing
    });
    axios.post('/api/search/details',{listing})
    .then(details => {
      console.log('Details returned client-side', details);
      const combined = Object.assign(details.data, listing);
      // console.log(combined);
      // sessionStorage.setItem('details',  combined);
      // let savedDetails = sessionStorage.getItem('details');
      //  let reassign = this.state.rentals[selected];
      this.setState({details: combined});

      console.log(this.state.details.title, '<---- details saved');
    });
  }


  render() {
    return (

      <BrowserRouter>

      <div>
        {/* <NavBar search={this.searchProperties} username={this.state.username} logout={this.logout}/> */}
        <Navigation search={this.searchProperties} username={this.state.username} logout={this.logout}/>
        <div className='main'> 
        <Switch>
          <Route exact path='/' render={(props) => { 
            return (
              <div>
                {/* <Search {...props} search={this.searchProperties}/> */}
                {/* <List {...props} retrieve={this.retrieveDetails} details={this.state.details} rentals={this.state.rentals} fav={this.addFavorite} username={this.state.username}/> */}
              </div>
            )
          }} />
          {/* <Route path='/saved-rentals' 
            render={(props) => <SavedRentals {...props} 
            saved={this.state.savedRentals} 
            favs={this.retrieveFavorites} 
            details={this.retrieveDetails} 
            delete={this.deleteFavorite}/>}/> */}
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
          <Route path='/map/private' render={(props) => {
            if(sessionStorage.getItem('userId')) {
              return <MapContainer {...props} getDataByType={this.dummyFavoritesUser} favorites={this.state.favorites}/>
            } else {
              console.log('Un-logged user attempting to access maps');
              return <Redirector />
            }
          }} />
          {/* <Route   
            path='/details'
            render={(props) => <Details {...props} 
            details={this.state.details} />}
          /> */}
          {/* 
            //add route for user/userid
            //add route for public markers with user and category as query string  
        */}

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
