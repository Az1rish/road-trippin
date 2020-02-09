/* eslint-disable react/static-property-placement */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './SearchBar.css';

class SearchBar extends Component {
  changeSelection(value) {
    const { changeHandler, locations, history } = this.props;

    if (value === 'None') {
      changeHandler(null);
    } else {
      const location = locations.find((place) => place === value);
      changeHandler(location);
      history.push('/location');
    }
  }

  render() {
    const { locations } = this.props;
    const options = [...new Set(locations)].map((location, i) => (
      <option
        value={location}
        key={i}
      >
        {location}
      </option>
    ));

    return (
      <div className="location_selector">
        <form>
          <label htmlFor="location">Select a location:</label>
          <select
            id="location"
            name="location"
            onChange={(e) => {
              this.changeSelection(e.target.value);
            }}
          >
            <option value="None">Select one...</option>
            {options}
          </select>
        </form>
      </div>
    );
  }
}

SearchBar.defaultProps = {
  locations: []
};

export default withRouter(SearchBar);
