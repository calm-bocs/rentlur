import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      username: '',
      password: ''
    }

    this.onUserChange =this.onUserChange.bind(this);
    this.onPssChange =this.onPssChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onUserChange(e) {
    this.setState({
      username: e.target.value
    });
  }
  onPssChange(e) {
    this.setState({
      password: e.target.value
    });
  }

// makes user in db if user does not exist
  handleSubmit(e) {
    axios.post('/api/signup', {username: this.state.username, password: this.state.password})
    .then ((response)=> {
      if (response.data.name) {
        alert('username exists!');
      } else {
        alert('sign up successful!');
        //redirects to login in success
        this.props.history.push('/login')
      }
    });
    e.preventDefault();
  }


  

  render() {
    return (
      <div className='signup-block'>
        <div className='signup-sign'>Signup</div>
        <form onSubmit={this.handleSubmit}>
          <input type='username' value={this.state.username} onChange={this.onUserChange} placeholder= 'username'/> <br/>
          <input type='password'  value={this.state.password} onChange={this.onPssChange} placeholder= 'password'/> <br/>
          <input className='sign-up-submit' type='submit' value='Submit'/>
        </form>
      </div>
    )
  }
}

export default Signup;