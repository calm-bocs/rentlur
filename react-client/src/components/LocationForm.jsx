import React, { Component } from "react";
import Geocode from "react-geocode";
import config from '../../../config.js';

const API_KEY = config.MAPS_API_KEY;

class LocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      description: "",
      category: "",
      latitude: "",
      longitude: "",
      public: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.geo = this.geo.bind(this);
  }
  geo() {
    console.log("hello");
    Geocode.setApiKey(API_KEY);
    Geocode.fromAddress(this.state.address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({ latitude: lat, longitude: lng }, () =>
          this.props.storeFavorite(this.state)
        );
      },
      error => {
        console.error(error);
      }
    );
  }

  handleChange(e) {
    if (e.target.name === 'public') {
      this.setState({public: e.target.checked})
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.geo();
  }
  render() {
    return (
      <form className="addySearch" onSubmit={this.handleSubmit}>
        <label>
          Address:
          <br />
          <input
            className="addyInput"
            name="address"
            onChange={this.handleChange}
            type="text"
            placeholder="e.g 1600 Amphitheatre Parkway, Mountain View, CA"
            required
          />
        </label>
        <br />
        <label>
          Description:
          <br />
          <input
            onChange={this.handleChange}
            type="text"
            placeholder="e.g Grandma's house"
            name="description"
            required
          />
        </label>
        <br />
        <label>
          Category:
          <br />
          <input
            type="text"
            placeholder="e.g Family"
            name="category"
            onChange={this.handleChange}
            required
          />
        </label>
        <br />
        <label>
          Allow Public Viewing:
          <input
            type='checkbox'
            name='public'
            checked={this.state.public}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default LocationForm;