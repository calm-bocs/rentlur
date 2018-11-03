import React from 'react';
import { render } from 'react-dom';
import config from '../../../config.js';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import InfoBox from './InfoBox.jsx';
const API_KEY = config.MAPS_API_KEY;

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMarker: null,
      showingInfoWindow: false,
      activeData: {}
    }
    this.setActiveMarker = this.setActiveMarker.bind(this);
    this.removeMarker = this.removeMarker.bind(this);
  }

  componentDidMount() {
    console.log('rendered map');
  }

  removeMarker(){
    console.log('in removeMarker function')
    this.setState({activeMarker: null, showingInfoWindow: false})
  }

  fetchData() {
    //this.props.getDataByType();
  }
  setActiveMarker(props, marker, e) {
    console.log('Current active: ', this.state.activeData);
    console.log('Clicked marker:', props.data)
    this.setState({activeMarker: marker, showingInfoWindow: true, activeData: props.data})
    render(<button onClick={this.removeMarker}>DELETE</button>, document.getElementById('delete-button'));
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location !== this.props.location) {
      this.setState({showingInfoWindow: false});
    }
  }

  render() {
    const style = {
      width: '50%',
      height: '75%'
    }
    const testLocation = {
      lat: 30.28,
      lng: -97.7431
    }
    let favorites = [];
    if(this.props.favorites) {
      favorites = this.props.favorites.map(fav => {
        let favLoc = JSON.parse(fav.coordinates);
        fav.position = {};
        fav.position.lat = parseFloat(favLoc.latitude);
        fav.position.lng = parseFloat(favLoc.longitude);
        return fav;
      });
    }
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
              <div>
                <InfoBox activeData={this.state.activeData} />
                <div id='delete-button'></div>
              </div>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY
})(MapContainer)