/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Nav from '../Nav/Nav';
import SearchBar from '../SearchBar/SearchBar';
import Footer from '../Footer/Footer';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import PrivateRoute from '../Utils/PrivateRoute';
import HomePage from '../../routes/Homepage/HomePage';
import LoginPage from '../../routes/LoginPage/LoginPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import AccountPage from '../../routes/AccountPage/AccountPage';
import MyPhotosPage from '../../routes/MyPhotosPage/MyPhotosPage';
import LocationPage from '../../routes/LocationPage/LocationPage';
import PhotoPage from '../../routes/PhotoPage/PhotoPage';
import UploadPage from '../../routes/UploadPage/UploadPage';
import EditPage from '../../routes/EditPage/EditPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import config from '../../config';
import TokenService from '../../services/token-service';
import AuthContext from '../../contexts/AuthContext';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      isAuthenticated: TokenService.hasAuthToken(),
      user: {},
      locations: [],
      selected: null
    };
  }

  componentDidMount() {
    this.setLocations();
  }

  setLocations = () => fetch(`${config.API_ENDPOINT}/photos`, {
    headers: {
    }
  })
    .then((res) => (
      (!res.ok)
        ? res.json().then((e) => Promise.reject(e))
        : res.json()))
    .then((data) => {
      const locations = data
        .map((photo) => photo.location);

      this.setState({
        locations
      });
    })
    .catch((err) => {
      this.setState({
        error: err.message
      });
    });

  setSelected(selected) {
    this.setState({
      selected
    });
  }


  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  changeState = () => {
    this.setState({
      isAuthenticated: TokenService.hasAuthToken()
    });
  };

  shouldRenderSearchBar = (path) => {
    if (TokenService.hasAuthToken() && (path === '/home' || path === '/myPhotos' || path === '/location')) {
      return true;
    }
    return false;
  };

  static contextType = AuthContext;

  render() {
    const {
      isAuthenticated,
      hasError,
      locations,
      selected
    } = this.state;
    const { location } = this.props;
    return (
      <div className="App">
        <header className="App__navBar">
          <Nav
            isAuthenticated={isAuthenticated}
            changeState={this.changeState}
          />
        </header>
        <main
          className="App__main"
        >
          {hasError && <p className="red">I'm sorry, it appears there is an error.</p>}
          {this.shouldRenderSearchBar(location.pathname)
            ? (
              <SearchBar
                locations={locations}
                changeHandler={(selection) => this.setSelected(selection)}
              />
            )
            : null}
          <Switch>
            <PublicOnlyRoute
              exact
              path="/"
              component={HomePage}
            />
            <PublicOnlyRoute
              path="/login"
              component={LoginPage}
            />
            <PublicOnlyRoute
              path="/register"
              component={RegistrationPage}
            />
            <PrivateRoute
              locations={locations}
              changeHandler={(selection) => this.setSelected(selection)}
              path="/home"
              component={AccountPage}
            />
            <PrivateRoute
              path="/myPhotos"
              component={MyPhotosPage}
            />
            <PrivateRoute
              path="/location"
              component={() => <LocationPage selected={selected} />}
            />
            <PrivateRoute
              exact
              path="/photo/:photoId"
              component={PhotoPage}
            />
            <PrivateRoute
              path="/upload"
              component={() => <UploadPage addLocation={this.setLocations} />}
            />
            <PrivateRoute
              path="/photo/:photoId/edit"
              component={() => <EditPage onEditSuccess={this.setLocations} />}
            />
            <Route
              component={NotFoundPage}
            />
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
