import React, { Component } from 'react'
import LocationPage from '../../routes/LocationPage/LocationPage'
import './SearchBar.css'

export default class SearchBar extends Component {
    changeSelection(value) {
        if(value === "None") {
            this.props.changeHandler(null)
        } else {
            const location = this.props.locations.find(location => location.name === value)
            this.props.changeHandler(location)
            return (
                <LocationPage selected={location} />
            )
        }
    }

    render() {
        const options = this.props.locations.map((location, i) => 
            <option value={location}
                key={i}>{location}</option>)

        return (
            <div className='location_selector'>
                <form>
                    <label htmlFor='location'>Select a location:</label>
                    <select
                        id='location'
                        name='location'
                        onChange={e => this.changeSelection(e.target.value)}>
                            <option value='None'>Select one...</option>
                            {options}
                        </select>
                </form>
            </div>
        )
    }
}

SearchBar.defaultProps = {
    locations: []
}