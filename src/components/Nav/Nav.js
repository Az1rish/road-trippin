import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import './Nav.css'

export default class Nav extends Component {
    
    handleLogoutClick = () => {
        this.handleLogChange()
        TokenService.clearAuthToken()
    }

    renderTitleLink() {
        return (
            <div className='Header__title-link'>
                {TokenService.hasAuthToken()
                    ?   <Link
                            to='/validUser'>
                            Road Trippin'
                        </Link>
                    :   <Link
                            to='/'>
                            Road Trippin'
                        </Link>
                }
            </div>
        )
    }

    renderLoginLink() {
        return (
            <div className='Header__not-logged-in'>
                <Link
                    to='/register'>
                    Register
                </Link>
                <Link
                    to='/login'
                    onClick={ this.props.handleLogChange }>
                    Log in
                </Link>
            </div>
        )
    }

    renderLogoutLink() {
        return (
            <div className='Header__logged-in'>
                <Link
                    to='/upload'>
                    Add Photo
                </Link>
                <Link
                    to='/myPhotos'>
                    My Photos
                </Link>
                <Link
                    onClick={this.handleLogoutClick}
                    to='/'>
                    Log Out
                </Link>
            </div>
        )
    }

    render() {
        console.log(this.props)
        return <>
            <nav className='Header'>
                <h1>
                    {this.renderTitleLink()}
                </h1>
                <div className='Header__buttons'>
                    {TokenService.hasAuthToken()
                    ? this.renderLogoutLink()
                    : this.renderLoginLink()}
                </div>
            </nav>
        </>
    }
}