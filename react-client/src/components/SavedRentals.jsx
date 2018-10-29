import React from 'react';
import SavedRentalItem from './SavedRentalItem.jsx';


class SavedRentals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favs: []
    };
  }


  componentDidUpdate() {
    if (this.state.favs !== this.props.saved) {
      console.log('mounting yeahhh well updating')
      this.setState({
        favs: this.props.saved
      });
      // this.props.favs();
    }
  }
  componentDidMount() {
    this.props.favs();
 
      console.log('mounting yeahhh');
      this.setState({
        favs: this.props.saved
      });
      // this.props.favs();
    
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