import React from 'react';
import {NavLink} from 'react-router-dom';

const SavedRentalItem = (props) => (
  <div>
    <h4> <a href={props.rental.url}>{props.rental.title}</a> </h4>
    <div>Price: {props.rental.price}</div>
    <div>Location: {props.rental.location}</div>
    <div onClick={() => {props.details(props.rental)}}>
      <NavLink to='/details'>Details</NavLink>
    </div>
    {/* delete on click from db */}
    <button onClick={()=> props.delete(props.rental.id)}>Remove</button>
  </div>
)

export default SavedRentalItem;