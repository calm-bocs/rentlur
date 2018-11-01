import React from 'react';
import config from '../../../config.js';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
const API_KEY = config.MAPS_API_KEY;

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.props.getDataByType();
  }

  render() {
    const style = {
      width: '50vw',
      height: '50vh'
    }
    const testLocation = {
      lat: 30.28,
      lng: -97.7431
    }
    const markers = this.props.favorites.map(fav => {
      let favLoc = JSON.parse(fav.coordinates);
      fav.position = {};
      fav.position.lat = parseFloat(favLoc.latitude);
      fav.position.lng = parseFloat(favLoc.longitude);
      return fav;
    });
    return (
      <div className='mapholder'>
        <Map
          google={this.props.google}
          zoom={11}
          style={style}
          initialCenter={testLocation}
        >
          {markers.map(marker => (<Marker key={marker.id} position={marker.position}/>))}
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY
})(MapContainer)