import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Nav from '../Nav/Nav'
import PublicOnlyRoute from '../Utils/PublicOnlyRoute'
import HomePage from '../../routes/Homepage/HomePage'
import LoginPage from '../../routes/LoginPage/LoginPage'

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
          </Switch>
        </main>
      </div>
    )
  }
}
