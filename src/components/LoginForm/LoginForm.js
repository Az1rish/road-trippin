/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import { Input, Button } from '../Utils/Utils';
import AuthContext from '../../contexts/AuthContext';
import './LoginForm.css';

export default class LoginForm extends Component {
    static defaultProps = {
      onLoginSuccess: () => {}
    }

    state = {
      error: null
    }

    handleSubmitJwtAuth = (ev) => {
      ev.preventDefault();
      // eslint-disable-next-line camelcase
      const { user_name, password } = ev.target;
      const { setUser } = this.context;
      // eslint-disable-next-line react/prop-types
      const { onLoginSuccess } = this.props;

      AuthApiService.postLogin({
        user_name: user_name.value,
        password: password.value
      })
        .then((res) => {
          setUser(user_name.value);

          user_name.value = '';
          password.value = '';
          TokenService.saveAuthToken(res.authToken);
          onLoginSuccess();
        })
        .catch((res) => {
          this.setState({ error: res.error });
        });
    }

    static contextType = AuthContext

    render() {
      const { error } = this.state;
      return (
        <form
          className="LoginForm"
          onSubmit={this.handleSubmitJwtAuth}
        >
          <div role="alert">
            {error && <p className="red">{error}</p>}
          </div>
          <div className="user_name">
            <label htmlFor="LoginForm__user_name">
              User name
            </label>
            <Input
              required
              name="user_name"
              id="LoginForm__user_name"
            />
          </div>
          <div className="password">
            <label htmlFor="LoginForm__password">
              Password
            </label>
            <Input
              required
              name="password"
              type="password"
              id="LoginForm__password"
            />
          </div>
          <Button type="submit">
            Login
          </Button>
        </form>
      );
    }
}
