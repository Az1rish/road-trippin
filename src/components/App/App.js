import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'
import PublicOnlyRoute from '../Utils/PublicOnlyRoute'
import PrivateRoute from '../Utils/PrivateRoute'
import HomePage from '../../routes/Homepage/HomePage'
import LoginPage from '../../routes/LoginPage/LoginPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import AccountPage from '../../routes/AccountPage/AccountPage'
import MyPhotosPage from '../../routes/MyPhotosPage/MyPhotosPage'
import PhotoPage from '../../routes/PhotoPage/PhotoPage'
import UploadPage from '../../routes/UploadPage/UploadPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import TokenService from '../../services/token-service'
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      authenticated: false
    }
  }

  changeState = () => {
    this.setState({
      authenticated: TokenService.hasAuthToken()
    })
  }

  static getDerivedStateFromError(error) {
    // console.error(error)
    return { hasError: true }
  } 

  render() {
    return (
      <div className='App'>
        <header className='App__navBar'>
          <Nav
            authenticated={this.state.authenticated}
            changeState={this.changeState} />
        </header>
        <main
          className='App__main'>
          {this.state.hasError && <p className='red'>I'm sorry, it appears there is an error.</p>}
          <Switch>
            <PublicOnlyRoute
              exact
              path={'/'}
              component={HomePage}
            />
            <PublicOnlyRoute
              path={'/login'}
              component={LoginPage}
              changeState={this.changeState}
            />
            <PublicOnlyRoute
              path={'/register'}
              component={RegistrationPage}
            />
            <PrivateRoute
              path={'/validUser'}
              component={AccountPage}
            />
            <PrivateRoute
              path={'/myPhotos'}
              component={MyPhotosPage}
            />
            <PrivateRoute
              path={'/photo/:photoId'}
              component={PhotoPage}
            />
            <PrivateRoute
              path={'/upload'}
              component={UploadPage}
            />
            <Route
              component={NotFoundPage}
            />
          </Switch>
        </main>
        <Footer />
      </div>
    )
  }
}
