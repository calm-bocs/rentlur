import React from 'react';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';

// Arrows for the image carousel
const Arrow = props => {
  const divStyle = {
    padding: "15px",
  }
  return (
    <div
    className={`${props.direction}-arrow`}
    onClick={props.onClick} style={divStyle}> 
    {props.direction === 'right' ? (<ArrowForward onClick={props.onClick}></ArrowForward>) : (<ArrowBack onClick={props.onClick}></ArrowBack>)}
    </div> 
  )
}

export default Arrow;