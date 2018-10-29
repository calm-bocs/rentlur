import React from 'react';
import Image from './Image.jsx';
import Arrow from './Arrow.jsx';
import Grid from '@material-ui/core/Grid';

export default class ImgSlide extends React.Component{
  constructor(props){
    super(props);

    /// Change imageUrls to this.props.details.images in production
    this.state = {
      currentImgIndex: 0,
      imageUrls:    [],
    }
    this.nextSlide = this.nextSlide.bind(this);
    this.previousSlide = this.previousSlide.bind(this);
  }

  //Both of these were to try to get the image carsouel to update pictures
  //it did not work. 
  componentDidUpdate(){
    if(this.props.imageUrls !== this.state.imageUrls){
      this.setState({imageUrls: this.props.imageUrls});
    }
  }

  componentDidMount(){
    this.setState({imageUrls: this.props.imageUrls});
  }

  nextSlide(){
  if (this.state.currentImgIndex === this.props.imageUrls.length-1){
    this.setState({currentImgIndex: 0});
  } else {
    this.setState({currentImgIndex: this.state.currentImgIndex + 1})
    }

  }

  previousSlide(){
    if(this.state.currentImgIndex === 0){
    this.setState({currentImgIndex: this.props.imageUrls.length-1});
    } else {
      this.setState({currentImgIndex: this.state.currentImgIndex - 1});
    }

  }

  // Conditional rendering of the image carousel.
  render(){
    return (
      <Grid container spacing={24} justify="center">
        <Grid>
          <Image imgUrl={this.props.imageUrls ? this.props.imageUrls[this.state.currentImgIndex] : null} />
        </Grid>
        <Grid container spacing={40} justify="center" alignContent="stretch">
          {this.props.imageUrls ? (
          <Grid item >
            <Arrow direction="left" onClick={this.previousSlide}/>
          </Grid>) : null}
          {this.props.imageUrls ? (
          <Grid item>
            <Arrow direction="right" onClick={this.nextSlide} />
          </Grid>) : null
        }
        </Grid>
      </Grid>
    )
  }
}

