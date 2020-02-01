import React, { Component } from 'react'
import { Section } from '../../components/Utils/Utils'
import './HomePage.css'
import { Link } from 'react-router-dom'

export default class HomePage extends Component {
    renderCards() {
        const cards = [
            "View photos and descriptions from locations around the world",
            "Upload your own photos for others to view",
            "Join the discussion with the Road Trippin' community",
            "Decide which wonderful place you want to visit!"
        ]
        return cards.map((card, i) =>
            <Section 
                className="card"
                key={i}>
                <p>{card}</p>
            </Section> 
        )
    }

    render() {
        return (
            <div className='homePage'>
                <h2>Share the world!</h2>
                <div className="cards">
                    {this.renderCards()}
                </div>
                <Link
                    className='homeButtons'
                    to='/login'>
                        Log in!
                </Link>
                <p className='question'>Not yet a member?</p>
                <Link
                    className='homeButtons'
                    to='/register'>
                        Create an account
                </Link>
            </div>
        ) 
    }
}