//LIKELY DONT NEED
// import React from 'react';
// import ImgSlide from './image_slider/ImgSlide.jsx';

// class Details extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       details: []
//     }
//   }

// // Needed for the craigslist scraper since pictures and urls weren't 
// // ready until after the others in the object. Not exactly sure why. 
//   waitOnData(obj) {

//     if (!obj) {
//       return '';
//     }
//     if (Array.isArray(obj)) {
//       return obj[0];
//     }

//     if (obj === Object(obj)) {
//       return `${this.props.details.replyUrl.hostname}${this.props.details.replyUrl.pathname}`
//     }
//   }
  
//   render() {
//     return (
//       <div>
//       {console.log(this.props.details)}
//         <h2>{this.props.details.title}</h2>
//         <ImgSlide imgUrls={this.props.details.images}/>
//         <ul>
//           <li>Price: {this.props.details.price} </li>
//           <li>Description: {this.props.details.description} </li>
//           <li>Map: {this.props.details.mapUrl}</li>
//           <li>Reply: {this.waitOnData(this.props.details.replyUrl)}</li>
//           <li>URL: {this.props.details.url} </li>
//           <li>Photos: {this.waitOnData(this.props.details.images)} </li>
//         </ul>

//       </div>
//     )
//   }
// } 

// export default Details;


