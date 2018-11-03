import React from 'react';
import { BrowserRouter, Route, Link, Switch, withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';

const Landing = (props) => (
  <div id="grid">
    Landing Page Dummy
    <div id="e">
    {sessionStorage.getItem('userId') ? <IconButton className='main-btn' component={Link} to='/map/private'>Main Page</IconButton>
      : <IconButton  id="e2" className='login-btn' component={Link} to='/login'>Log In</IconButton>}
    {sessionStorage.getItem('userId') ? <IconButton className='logout-btn' onClick={props.logout} component={Link} to='/logout'>Log Out</IconButton>
      : <IconButton id="e3" className='signup-btn' component={Link} to='/signup'>Sign Up</IconButton>}
  </div>
  </div>
)

export default Landing