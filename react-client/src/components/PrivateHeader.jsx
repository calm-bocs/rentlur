import React from 'react';
import LocationForm from './LocationForm.jsx';

class PrivateHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPrivate();
  }

  render() {
    return <LocationForm storeFavorite={this.props.storeFavorite}/>
  }
}

export default PrivateHeader