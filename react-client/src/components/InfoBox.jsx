import React from 'react';

const InfoBox = (props) => {
  console.log('Rendering infobox');
  return (<div className='info-box'>
    <span className='info-type'>Location:</span>
    <br />
    <span className='info-address'>{props.activeData.location}</span>
    <br />
    <span className='info-type'>Description:</span>
    <br />
    <span className='info-description'>{props.activeData.description}</span>
    {/* <br />
    <button className='delete-btn' onClick={(e) => console.log('clicked delete button')}>Delete</button> */}
  </div>)
}

export default InfoBox;