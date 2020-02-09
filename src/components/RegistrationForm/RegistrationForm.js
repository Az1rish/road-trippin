/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { Input, Required, Button } from '../Utils/Utils';
import AuthApiService from '../../services/auth-api-service';
import './RegistrationForm.css';

export default class RegistrationForm extends Component {
    static defaultProps = {
      onRegistrationSuccess: () => {}
    }

    state = { error: null }

    handleSubmit = (ev) => {
      ev.preventDefault();

      const { full_name, user_name, password } = ev.target;
      const { onRegistrationSuccess } = this.props;

      this.setState({ error: null });
      AuthApiService.postUser({
        user_name: user_name.value,
        password: password.value,
        full_name: full_name.value
      })
        .then((user) => {
          full_name.value = '';
          user_name.value = '';
          password.value = '';
          onRegistrationSuccess();
        })
        .catch((res) => {
          this.setState({ error: res.error });
        });
    }

    render() {
      const { error } = this.state;
      return (
        <form
          className="RegistrationForm"
          onSubmit={this.handleSubmit}
        >
          <div role="alert">
            {error && <p className="red">{error}</p>}
          </div>
          <div className="full_name">
            <label htmlFor="RegistrationForm__full_name">
              Full name
              {' '}
              <Required />
            </label>
            <Input
              name="full_name"
              type="text"
              required
              id="RegistrationForm__full_name"
            />
          </div>
          <div className="user_name">
            <label htmlFor="RegistrationForm__user_name">
              User name
              {' '}
              <Required />
            </label>
            <Input
              name="user_name"
              type="text"
              required
              id="RegistrationForm__user_name"
            />
          </div>
          <div className="password">
            <label htmlFor="RegistrationForm__password">
              Password
              {' '}
              <Required />

            </label>
            <Input
              name="password"
              type="password"
              required
              id="RegistrationForm__password"
            />
            <p className="instruction">
              (must be at least 8 characters long, have no spaces and contain one or more of each: upper case letter, lower case letter, number and special characters)
            </p>
          </div>
          <Button type="submit">
            Register
          </Button>
        </form>
      );
    }
}
