import React from 'react';
import {NavLink} from 'react-router-dom';

const ListItem = (props) => (
  <div>
    <h4> <a href={props.rental.url} target="_blank">{props.rental.title}</a> </h4>
    <div>Price: {props.rental.price}</div>
    <div>Location: {props.rental.location}</div>
    <div onClick={() => {props.retrieve(props.rental)}}>
      <NavLink to='/details'>Details</NavLink>
    </div>
    {/* save to users favs */}
    {props.username ?     
    (<button onClick={() => props.fav(props.rental)}>Save to favs</button>) : null}

  </div>
)

export default ListItem;
