/* eslint-disable react/prop-types */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';

const AuthContext = React.createContext({
  user: {},
  isAuthenticated: null,
  setUser: () => {},
  clearUser: () => {},
  setIsAuthenticated: () => {},
  clearIsAuthenticated: () => {}
});

export default AuthContext;

export class AuthProvider extends Component {
    state = {
      user: {},
      isAuthenticated: null
    }

    setUser = (user) => {
      localStorage.setItem('user', user);
      this.setState({
        user
      });
    }

    clearUser = () => {
      this.setState({
        user: {}
      });
    }

    setIsAuthenticated = (isAuthenticated) => {
      this.setState({
        isAuthenticated
      });
    }

    clearIsAuthenticated = () => {
      this.setState({
        isAuthenticated: null
      });
    }

    render() {
      const { user, isAuthenticated } = this.state;
      const { children } = this.props;
      const value = {
        user,
        isAuthenticated,
        setUser: this.setUser,
        clearUser: this.clearUser,
        setIsAuthenticated: this.setIsAuthenticated,
        clearIsAuthenticated: this.clearIsAuthenticated
      };
      return (
        <AuthContext.Provider value={value}>
          {children}
        </AuthContext.Provider>
      );
    }
}
