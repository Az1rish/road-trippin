import React, { Component } from 'react'
import { Section } from '../../components/Utils/Utils'
import './HomePage.css'
import ButtonLink from '../../components/ButtonLink/ButtonLink'

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
            <div className='homePage'>
                <h2>Helping everyone see the world</h2>
                <div className="cards">
                    {this.renderCards()}
                </div>
                <ButtonLink
                    className='homeButtons'
                    to='/login'>
                        Log in!
                </ButtonLink>
                <p>Not yet a member?</p>
                <ButtonLink
                    className='homeButtons'
                    to='/register'>
                        Create an account
                </ButtonLink>
            </div>
        ) 
    }
}