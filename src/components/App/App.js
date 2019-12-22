import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Nav from '../Nav/Nav'
import HomePage from '../../routes/Homepage'

export default class App extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    return (
      <div className='App'>
        <nav className='App__navBar'>
          <Nav />
        </nav>
        <main className='App__main'>
          {this.state.hasError && <p className='red'>I'm sorry, it appears there is an error.</p>}
          <Switch>
            <Route
              exact
              path={'/'}
              component={HomePage}
            />
          </Switch>
        </main>
      </div>
    )
  }
}
