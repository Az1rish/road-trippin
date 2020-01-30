import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import { Section } from '../../components/Utils/Utils'
import { withRouter } from 'react-router-dom'
import './LoginPage.css'

class LoginPage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {},
        },
    }

    handleLoginSuccess = () => { 
        this.props.changeState()
        this.props.history.push('/home')
    }
    
    render() {
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

export default withRouter(LoginPage)