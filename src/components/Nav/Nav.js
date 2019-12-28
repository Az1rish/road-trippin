import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import './Nav.css'

export default class Nav extends Component {
    handleLogoutClick = () => {
        TokenService.clearAuthToken()
    }

    renderTitleLink() {
        return (
            <div className='Header__title-link'>
                {TokenService.hasAuthToken()
                    ?   <>
                        <Link
                            className='homeLink'
                            to='/account/:AccountId'>
                            Road Trippin'
                        </Link>
                        <Link
                            className='myPhotosLink'
                            to='/myPhotos'>
                                My Photos
                        </Link>
                        <Link
                            className='logoutLink'
                            to='/'>
                                Log Out
                        </Link>
                        </>
                    :   <Link
                            className='homeLink'
                            to='/'>
                            Road Trippin'
                        </Link>
                }
            </div>
        )
    }

    renderLogoutLink() {
        return (
            <div className='Header__logged-in'>
                <Link
                    to='/account/:AccountID/myPhotos'>
                    My Photos
                </Link>
                <Link
                    onClick={this.handleLogoutClick}
                    to='/'>
                    Logout
                </Link>
            </div>
        )
    }

    render() {
        return <>
            <nav className='Header'>
                <h1>
                    {this.renderTitleLink()}
                </h1>
                {TokenService.hasAuthToken()
                    ? this.renderLogoutLink()
                    : null}
            </nav>
        </>
    }
}