import React from 'react';
//import config from '../../../config.js';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
//const API_KEY = config.MAPS_API_KEY;

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMarker: null,
      showingInfoWindow: false,
      activeData: {}
    }
    this.setActiveMarker = this.setActiveMarker.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.props.getDataByType();
  }
  setActiveMarker(props, marker, e) {
    console.log('Current active: ', this.state.activeData);
    console.log('Clicked marker:', props.data)
    this.setState({activeMarker: marker, showingInfoWindow: true, activeData: props.data})
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
    const favorites = this.props.favorites.map(fav => {
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
          {favorites.map(marker => (
            <Marker 
              key={marker.id} 
              position={marker.position}
              onClick={this.setActiveMarker}
              data={marker}>
            </Marker>)
          )}
          <InfoWindow 
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              >
                <span>{this.state.activeData.description}</span>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}

// export default GoogleApiWrapper({
//   apiKey: API_KEY
// })(MapContainer)