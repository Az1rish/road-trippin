import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from '../../services/token-service'
import SearchBar from '../SearchBar/SearchBar'

export default function PrivateRoute({ component, ...props }) {
    const Component = component
    return (
        <Route
            {...props}
            render={componentProps => (
                TokenService.hasAuthToken()
                    ?   <>
                            <SearchBar
                                locations={this.props.locations}
                                changeHandler={selected => this.props.setSelected(selected)} />
                            <Component {...componentProps} />
                        </>
                    :   <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: componentProps.location }
                            }}
                        />
            )}
        />
    )
}