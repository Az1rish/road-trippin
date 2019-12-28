import React, { Component } from 'react'
// import TokenService from '../../services/token-service'
// import AuthApiService from '../../services/auth-api-service'
import { Input } from '../Utils/Utils'
import ButtonLink from '../ButtonLink/ButtonLink'

export default class LoginForm extends Component {
    

    render() {
        // const { error } = this.state
        return (
            <form
                className='LoginForm'
                // onSubmit={this.handleSubmitJwtAuth}
            >
                
                <div className='user_name'>
                    <label htmlFor='LoginForm__user_name'>
                        User name
                    </label>
                    <Input
                        required
                        name='user_name'
                        id='LoginForm__user_name'>
                    </Input>
                </div>
                <div className='password'>
                    <label htmlFor='LoginForm__password'>
                        Password
                    </label>
                    <Input
                        required
                        name='password'
                        type='password'
                        id='LoginForm__password'>
                    </Input>
                </div>
                <ButtonLink
                    to='/account'
                    name='Login'>
                    Login
                </ButtonLink>
            </form>
        )
    }
}