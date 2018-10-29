import React from 'react';
import SavedRentalItem from './SavedRentalItem.jsx';


class SavedRentals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favs: []
    };
  }

// update
  componentDidUpdate() {
    if (this.state.favs !== this.props.saved) {
      this.setState({
        favs: this.props.saved
      });
    }
  }
  
  // mount
  componentDidMount() {
    this.props.favs();
      this.setState({
        favs: this.props.saved
      });
    
  }

  render() {
    return (
          <div>
            <h1>Saved Rentals</h1>
            <ul>
              {
                this.state.favs.map( (item, index) => (
                <li key={index}>
                  <SavedRentalItem rental={item} details={this.props.details} delete={this.props.delete} index={index}/>
                </li>
                )) 
              }
            </ul>
          </div>
    
    )
  } 
} 
  
    
  


export default SavedRentals