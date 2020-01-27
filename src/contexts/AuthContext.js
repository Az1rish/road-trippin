import React, { Component } from 'react'

const AuthContext = React.createContext({
    user: {},
    isAuthenticated: null,
    setUser: () => {},
    clearUser: () => {},
    setIsAuthenticated: () => {},
    clearIsAuthenticated: () => {},
})

export default AuthContext

export class AuthProvider extends Component {
    state = {
        user: {},
        isAuthenticated: null,
    }

    setUser = user => {
        this.setState({
            user
        })
    }

    clearUser = () => {
        this.setState({
            user: {}
        })
    }

    setIsAuthenticated = isAuthenticated => {
        this.setState({
            isAuthenticated
        })
    }

    clearIsAuthenticated = () => {
        this.setState({
            isAuthenticated: null
        })
    }

    render() {
        const value = {
            user: this.state.user,
            isAuthenticated: this.state.isAuthenticated,
            setUser: this.setUser,
            clearUser: this.clearUser,
            setIsAuthenticated: this.setIsAuthenticated,
            clearIsAuthenticated: this.clearIsAuthenticated,
        }
        return (
            <AuthContext.Provider value={value}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}