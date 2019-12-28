import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'
import PublicOnlyRoute from '../Utils/PublicOnlyRoute'
// import PrivateRoute from '../Utils/PrivateRoute'
import HomePage from '../../routes/Homepage/HomePage'
import LoginPage from '../../routes/LoginPage/LoginPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import AccountPage from '../../routes/AccountPage/AccountPage'
import MyPhotosPage from '../../routes/MyPhotosPage/MyPhotosPage'
import PhotoPage from '../../routes/PhotoPage/PhotoPage'
import UploadPage from '../../routes/UploadPage/UploadPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import './App.css'

export default class App extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    return (
      <div className='App'>
        <header className='App__navBar'>
          <Nav />
        </header>
        <main className='App__main'>
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
            />
            <PublicOnlyRoute
              path={'/register'}
              component={RegistrationPage}
            />
            <PublicOnlyRoute
              path={'/account'}
              component={AccountPage}
            />
            <PublicOnlyRoute
              path={'/myPhotos'}
              component={MyPhotosPage}
            />
            <PublicOnlyRoute
              path={'/photo/:photoId'}
              component={PhotoPage}
            />
            <PublicOnlyRoute
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
