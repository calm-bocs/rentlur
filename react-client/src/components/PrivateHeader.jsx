import React from 'react';

class PrivateHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPrivate();
  }

  render() {
    return <div>Eventually A Form Maybe</div>
  }
}

export default PrivateHeader