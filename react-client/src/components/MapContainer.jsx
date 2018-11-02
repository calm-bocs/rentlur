import React from 'react';
//import config from '../../../config.js';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
//const API_KEY = config.MAPS_API_KEY;

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
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
    return (
      <div className='mapholder'>
        <Map 
          google={this.props.google}
          zoom={11}
          style={style}
          initialCenter={testLocation}
        />
      </div>
    )
  }
}

// export default GoogleApiWrapper({
//   apiKey: API_KEY
// })(MapContainer)