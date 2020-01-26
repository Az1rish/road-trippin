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
import EditPage from '../../routes/EditPage/EditPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import TokenService from '../../services/token-service'
import AuthContext from '../../contexts/AuthContext'
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      isAuthenticated: TokenService.hasAuthToken(),
      user: null
    }
  }

  static contextType = AuthContext

  changeState = () => {
    this.setState({
      isAuthenticated: TokenService.hasAuthToken()
    })
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  } 

  render() {
    return (
      <div className='App'>
        <header className='App__navBar'>
          <Nav
            isAuthenticated={this.state.isAuthenticated}
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
              component={() => <LoginPage changeState={this.changeState} />}
            />
            <PublicOnlyRoute
              path={'/register'}
              component={RegistrationPage}
            />
            <PrivateRoute
              path={'/user'}
              component={AccountPage}
            />
            <PrivateRoute
              path={'/myPhotos'}
              component={MyPhotosPage}
            />
            <PrivateRoute
              exact
              path={'/photo/:photoId'}
              component={PhotoPage}
            />
            <PrivateRoute
              path={'/upload'}
              component={UploadPage}
            />
            <PrivateRoute
              path={'/photo/:photoId/edit'}
              component={EditPage}
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
