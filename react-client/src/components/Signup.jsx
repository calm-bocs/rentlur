import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.onChange =this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reset = this.reset.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  reset () {
    this.setState({
      username: '',
      password: ''
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.signup(this.state.username, this.state.password);
    this.reset();
  }


  render() {
    return (
      <div className='signup-block'>
        <div className='signup-sign'>Signup</div>
        <form onSubmit={this.handleSubmit}>
          <input type='username' name='username' value={this.state.username} onChange={this.onChange} placeholder= 'username'/> <br/>
          <input type='password' name='password' value={this.state.password} onChange={this.onChange} placeholder= 'password'/> <br/>
          <input className='sign-up-submit' type='submit' value='Submit'/>
        </form>
        <IconButton className='login-btn' component={Link} to='/login'>Log In</IconButton>
      </div>
    )
  }
}

export default Signup;