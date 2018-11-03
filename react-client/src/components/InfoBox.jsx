import React from 'react';

const InfoBox = (props) => (
  <div>
    <span className='info-type'>Location:</span>
    <br />
    <span className='info-address'>{props.activeData.location}</span>
    <br />
    <span className='info-type'>Description:</span>
    <br />
    <span className='info-description'>{props.activeData.description}</span>
  </div>
)

export default InfoBox;