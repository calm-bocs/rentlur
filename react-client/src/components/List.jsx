import React from 'react';
import ListItem from './ListItem.jsx';

class List extends React.Component {
   constructor(props) {
     super(props);
   }


  render() { 
    return (
      <div>
        <h4 className='results'> Results </h4>
        { this.props.rentals.map((rental, index) => 
        <ListItem key={index} retrieve={this.props.retrieve} rental={rental} fav={this.props.fav} index={index} username={this.props.username}/>
        )}
      </div>
    )
  }
};

export default List;
