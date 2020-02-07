import React, { Component } from 'react'
import { Section, Button } from '../../components/Utils/Utils'
import AuthApiService from '../../services/auth-api-service'
import TokenService from '../../services/token-service'
import AuthContext from '../../contexts/AuthContext'
import './HomePage.css'
import { Link } from 'react-router-dom'

export default class HomePage extends Component {
    static defaultProps = {
        onLoginSuccess: () => {}
    }

    static contextType = AuthContext

    state = {
        error: null,
    }

    handleGuestSignIn = ev => {
        ev.preventDefault()
        const credentials = {
            user_name: 'DemoUser',
            password: 'A1$password'
        }

        AuthApiService.postLogin(credentials)
            .then((res) => {
                this.context.setUser(credentials.user_name)
                TokenService.saveAuthToken(res.authToken)
                this.props.history.push('/home')
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
        
    }

    renderCards() {
        const cards = [
            "View photos and descriptions from locations around the world",
            "Upload your own photos for others to view",
            "Join the discussion with the Road Trippin' community",
            "Decide which wonderful place you want to visit!"
        ]
        return cards.map((card, i) =>
            <Section 
                className="card"
                key={i}>
                <p>{card}</p>
            </Section> 
        )
    }

    render() {
        return (
            <div className='homePage'>
                <h2>Share the world!</h2>
                <div className="cards">
                    {this.renderCards()}
                </div>
                <Link
                    className='homeButtons'
                    to='/login'>
                        Log in!
                </Link>
                <p className='question'>Not yet a member?</p>
                <Link
                    className='homeButtons'
                    to='/register'>
                        Create an account
                </Link>
                <form 
                    className='guestSignIn'
                    onSubmit={this.handleGuestSignIn}>
                    <p className='question'>No time to register an account?</p>
                    <Button type='submit'>Sign in as a guest</Button>
                </form>
            </div>
        ) 
    }
}