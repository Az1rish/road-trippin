import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import { Section } from '../../components/Utils/Utils'
import { Redirect } from 'react-router-dom'
import TokenService from '../../services/token-service'
import './LoginPage.css'

export default class LoginPage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {},
        },
    }

    handleLoginSuccess = () => {
        this.props.changeState()
        
        if (TokenService.hasAuthToken()) {
            return <Redirect to='/validUser' />
        }
    }
        
    render() {
        // console.log(this.props)
        return (
            <Section className='LoginPage'>
                <h2>Login</h2>
                <LoginForm
                    onLoginSuccess={this.handleLoginSuccess}
                />
            </Section>
        )
    }
}