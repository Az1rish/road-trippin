/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import AuthContext from '../../contexts/AuthContext';
import './Nav.css';

export default class Nav extends Component {
    handleLogoutClick = () => {
      const { changeState } = this.props;
      TokenService.clearAuthToken();
      localStorage.removeItem('user');
      changeState();
    }

    static contextType = AuthContext

    renderTitleLink = () => (
      <div className="Header__title-link">
        {TokenService.hasAuthToken()
          ? (
            <Link
              to="/home"
            >
              Road Trippin'
            </Link>
          )
          : (
            <Link
              to="/"
            >
              Road Trippin'
            </Link>
          )}
      </div>
    )

    renderLoginLink = () => (
      <div className="Header__not-logged-in">
        <Link
          to="/"
        >
          Home
        </Link>
        <Link
          to="/register"
        >
          Register
        </Link>
        <Link
          to="/login"
        >
          Log in
        </Link>
      </div>
    )

    renderLogoutLink() {
      return (
        <div className="Header__logged-in">
          <Link
            to="/home"
          >
            Home
          </Link>
          <Link
            to="/upload"
          >
            Add Photo
          </Link>
          <Link
            to="/myPhotos"
          >
            My Photos
          </Link>
          <Link
            onClick={this.handleLogoutClick}
            to="/"
          >
            Log Out
          </Link>
        </div>
      );
    }

    render() {
      return (
        <>
          <nav
            className="Header"
          >
            <h1>
              {this.renderTitleLink()}
            </h1>
            <div className="Header__buttons">
              {TokenService.hasAuthToken()
                ? this.renderLogoutLink()
                : this.renderLoginLink()}
            </div>
          </nav>
        </>
      );
    }
}
