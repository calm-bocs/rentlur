import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.onUserChange = this.onUserChange.bind(this);
    this.onPassChange = this.onPassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  onUserChange(e) {
    this.setState({
      username: e.target.value
    });
  }

  onPassChange(e) {
    this.setState({
      password: e.target.value
    });
  }
  
// on submit redirects to results page
  handleSubmit(e) {
    this.props.login(this.state.username, this.state.password);
    e.preventDefault();
    this.props.history.push('/');
  }


  render() {
    return (
      <div className='login-block'>
      <form onSubmit={this.handleSubmit}>
        <div className='login-sign'>Login</div>
          <div>
            <input type='username' value={this.state.username} onChange={this.onUserChange} placeholder='username'/>
          </div>
          <div>
            <input type= "password" value={this.state.password} onChange={this.onPassChange} placeholder='password'/>
          </div>
          <input className='log-in-submit' type='submit' value='Submit'/>
        </form>
      </div>
    )
  }
}


export default Login