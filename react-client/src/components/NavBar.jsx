import React from 'react';
import { NavLink } from 'react-router-dom';


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 0 
    };
    this.renderLoggedStatus = this.renderLoggedStatus.bind(this);
  }

  componentDidUpdate() {
    if (this.state.userId !== this.props.username) {
      console.log('mounting');
      this.setState({
        userId: this.props.username
      });
    }
  }

  componentDidMount() {
    if (this.state.userId !== this.props.username) {
      console.log('mounting' , this.state.userId);
      this.setState({ 
        userId: this.props.username
      });
    }
  }
  renderLoggedStatus() {
    if (this.state.userId > 0) {
      return (
        <div>
          <span onClick={()=> this.props.getFavs()}>
            <NavLink className='tags' activeStyle={{color:'white'}} to='/saved-rentals'>Saved Rentals</NavLink>
          </span>
          <span onClick={()=> this.props.logout()}>
            <NavLink className='tags' to='/'>Logout</NavLink>
          </span>
        </div>
      )
    } else {
      return (
        <div>
          <NavLink className='tags' activeStyle={{color:'white'}} to='/login'>Login</NavLink>
          <NavLink className='tags' activeStyle={{color:'white'}} to='/signup'>Signup</NavLink>
        </div>
      )
    }
  }



  render() {
    return (
      <div className='nav-bar'>
        <NavLink className='logo' to='/'>Rentlur</NavLink>
        {this.renderLoggedStatus()}
      </div>
    )
  }
  
}

export default NavBar;