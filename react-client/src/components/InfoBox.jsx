import React from 'react';

const InfoBox = (props) => (
  <div className='info-box'>
    <span className='info-type'>Location:</span>
    <br />
    <span className='info-address'>{props.activeData.location}</span>
    <br />
    <span className='info-type'>Description:</span>
    <br />
    <span className='info-description'>{props.activeData.description}</span>
    {/* <br />
    <button className='delete-btn'>Delete</button> */}
  </div>
)

export default InfoBox;