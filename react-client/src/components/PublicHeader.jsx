import React from 'react';

class PublicHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPublic();
  }

  render() {
    return <div>Eventually A Form Maybe</div>
  }
}

export default PublicHeader