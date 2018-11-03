import React from 'react';

class PublicHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPublic();
  }

  render() {
    return <div className='addySearch'>Viewing Public Favorites</div>
  }
}

export default PublicHeader