import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reset = this.reset.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password, this.props.history);
    this.reset();
  }

  reset () {
    this.setState({
      username: '',
      password: ''
    });
  }


  render() {
    return (
      <div className='login-block'>
      <form onSubmit={this.handleSubmit}>
      <div className='login-sign'>Login</div>
        <div>
          <input type='username' name='username' value={this.state.username} onChange={this.onChange} placeholder='username'/>
        </div>
        <div>
          <input type= "password" name='password' value={this.state.password} onChange={this.onChange} placeholder='password'/>
        </div>
        <input className='log-in-submit' type='submit' value='Submit'/>
        </form>
        <IconButton className='signup-btn' component={Link} to='/signup'>Sign Up</IconButton>
      </div>
    )
  }
}


export default Login