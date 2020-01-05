import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import './Nav.css'

export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: false
        }
    }

    changeState = () => {
        if (TokenService.hasAuthToken()) {
            this.setState({
                logged: true
            })
        }
    }

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
    }

    renderTitleLink() {
        this.changeState()
        return (
            <div className='Header__title-link'>
                {this.state.logged
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
        this.changeState()
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
        this.changeState()
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
        // console.log(this.props)
        return <>
            <nav className='Header'>
                <h1>
                    {this.renderTitleLink()}
                </h1>
                <div className='Header__buttons'>
                    {this.state.logged
                    ? this.renderLogoutLink()
                    : this.renderLoginLink()}
                </div>
            </nav>
        </>
    }
}