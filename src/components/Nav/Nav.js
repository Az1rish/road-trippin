import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import AuthContext from '../../contexts/AuthContext'
import './Nav.css'

export default class Nav extends Component {
    static contextType = AuthContext

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
        this.props.changeState()
    }

    
    renderTitleLink() {
        return (
            <div className='Header__title-link'>
                {this.props.isAuthenticated
                    ?   <Link
                            to='/home'>
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
                    to='/login'>
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
        return <>
            <nav
                className='Header'>
                <h1>
                    {this.renderTitleLink()}
                </h1>
                <div className='Header__buttons'>
                    {this.props.isAuthenticated
                    ? this.renderLogoutLink()
                    : this.renderLoginLink()}
                </div>
            </nav>
        </>
    }
}