import React from 'react';

class PublicHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPublic();
  }

  render() {
    return <div>Something Different From The Private</div>
  }
}

export default PublicHeader