import React from "react";



class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.onKeyPress = this.onKeyPress.bind(this);
    this.reset = this.reset.bind(this);
  }

  // set state
  changeState(loc) {
    this.setState({
      location: loc
    });

  }

  handleSubmit(e) {
    console.log(this.state.location)
    this.props.search(this.state.location)
    e.preventDefault();
  }

  // set state while typing
  onChange(e) {
    this.changeState(e.target.value);
  }

  // set state on "return" key
  // onKeyPress(e) {
  //   if (e.which === 13) {
  //     this.props.search(this.state.location);
  //     // this.changeState(e.target.value);
  //     // this.reset();
  //   }
  // }

  // reset state
  reset() {
    this.setState({
      location: '',
    });
  }

  render() {
    return ( 
      <div>
        <h4> Search </h4>
        <form onSubmit={this.handleSubmit}>
          Enter a location: <input value = {this.state.location} onChange = {this.onChange}  placeholder='type in location'/>        
          <input className='submit' type='submit' value='Search'/>
        </form>
      </div>
    )
  }
}


export default Search