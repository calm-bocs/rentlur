import React from 'react';
import {withRouter} from 'react-router-dom';

class Redirector extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.history.push('/');
  }
  render() {
    return (<div>Not logged in! Returning to entrance page...</div>)
  } 
}

export default withRouter(Redirector)