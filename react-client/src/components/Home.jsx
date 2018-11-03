import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, withRouter, Router } from 'react-router-dom';
import MapContainer from './MapContainer.jsx';
import PrivateHeader from './PrivateHeader.jsx';
import PublicHeader from './PublicHeader.jsx';
import Navigation from './Navigation.jsx';
import Redirector from './Redirector.jsx';

const Home = (props) => {
  if (sessionStorage.getItem('userId')) {
    return (
      <div>
        <Navigation navigateTo={props.navigateTo} location={props.location} username={props.username} logout={props.logout} {...props}/>
        <div className = 'main'>
          {/* {props.location === 'private' 
            ? <PrivateHeader getPrivate={props.getPrivate} location={props.location}/>
            : <PublicHeader getPublic={props.getPublic} location={props.location}/>} */}
          <MapContainer {...props} favorites={props.favorites} deleteFavorite={props.deleteFavorite}/>
          <Switch>
            <Route path='/map/private'>
              <PrivateHeader storeFavorite={props.storeFavorite} getPrivate={props.getPrivate} location={props.location}/>
            </Route>
            <Route path='/map/public'> 
              <PublicHeader getPublic={props.getPublic} location={props.location}/>
            </Route>
          </Switch>
        </div>
      </div>
    )
  } else {
    console.log('Un-logged user attempting to access maps');
    return <Redirector />
  }
}

export default Home

/*           <Route path='/map/private' render={(props) => {
            if(sessionStorage.getItem('userId')) {
              return <MapContainer {...props} getDataByType={this.dummyFavoritesUser} favorites={this.state.favorites}/>
            } else {
              console.log('Un-logged user attempting to access maps');
              return <Redirector />
            }
          }} /> */