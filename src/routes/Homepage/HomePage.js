import React, { Component } from 'react'
import { Section } from '../../components/Utils/Utils'
import LoginForm from '../../components/LoginForm/LoginForm'
import './HomePage.css'

export default class HomePage extends Component {
    renderCards() {
        const cards = [
            "View photos and descriptions from locations around the world",
            "Upload your own photos for others to view",
            "Join the discussion with the Road Trippin' community",
            "Decide which wonderful place you want to visit!"
        ]
        return cards.map(card =>
            <Section className="card">
                <p>{card}</p>
            </Section> 
        )
    }

    render() {
        return (
            <div>
                <h2>Helping everyone see the world</h2>
                <div className="cards">
                    {this.renderCards()}
                </div>
                <LoginForm
                    className='homePageLogin'
                />
            </div>
        ) 
    }
}