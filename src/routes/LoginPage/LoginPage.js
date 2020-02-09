/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import { Section } from '../../components/Utils/Utils';
import './LoginPage.css';

class LoginPage extends Component {
    static defaultProps = {
      location: {},
      history: {
        push: () => {}
      }
    }

    handleLoginSuccess = () => {
      const { history } = this.props;
      history.push('/home');
    }

    render() {
      return (
        <Section className="LoginPage">
          <h2>Login</h2>
          <LoginForm
            onLoginSuccess={this.handleLoginSuccess}
          />
        </Section>
      );
    }
}

export default withRouter(LoginPage);
