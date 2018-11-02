import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, withRouter } from 'react-router-dom';
import MapContainer from './MapContainer.jsx';
import PrivateHeader from './PrivateHeader.jsx';

const Home = (props) => {
  if (sessionStorage.getItem('userId')) {
    return (
      <BrowserRouter>

        <div>
          {/* navbar */''}
          <Switch> 
            <Route path='/map/private' >
              <PrivateHeader getPrivate={props.getPrivate}/>
            </Route>
            <Route path='/map/public'>
              {/*props.getPublic() ? '' : ''*/''}
            </Route>
          </Switch>
          <MapContainer {...props}/>
        </div>
      </BrowserRouter>
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