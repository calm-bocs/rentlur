import React from 'react';
import {withRouter} from 'react-router-dom';

class Redirector extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.history.replace('/');
  }
  render() {
    return (<div>Returning to entrance page...</div>)
  } 
}

export default withRouter(Redirector)