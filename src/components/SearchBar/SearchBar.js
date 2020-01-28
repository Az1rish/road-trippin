import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import LocationPage from '../../routes/LocationPage/LocationPage'
import './SearchBar.css'

class SearchBar extends Component {
    changeSelection(value) {
        if(value === "None") {
            this.props.changeHandler(null)
        } else {
            const location = this.props.locations.find(location => location === value)
            this.props.changeHandler(location)
            this.props.history.push('/location')
        }
    }

    render() {
        // const unique = [...new Set(array.map(item => item.age))];
        const options = [...new Set(this.props.locations)].map((location, i) => 
            <option value={location}
                key={i}>{location}</option>)

        return (
            <div className='location_selector'>
                <form>
                    <label htmlFor='location'>Select a location:</label>
                    <select
                        id='location'
                        name='location'
                        onChange={e => {
                            this.changeSelection(e.target.value)}}>
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

export default withRouter(SearchBar)