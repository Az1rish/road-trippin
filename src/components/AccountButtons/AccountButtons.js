import React, { Component } from 'react'
import ButtonLink from '../ButtonLink/ButtonLink'
import { Section } from '../Utils/Utils'
import './AccountButtons.css'

export default class AccountButtons extends Component {
    render() {
        return (
            <Section list className='AccountButtons'>
                <ButtonLink
                    to='/myPhotos'
                    className='myPhotosButton'>
                        My Photos
                </ButtonLink>
                <ButtonLink
                    to='/'
                    className='logoutButton'>
                        Log Out
                </ButtonLink>
            </Section>
        )
    }
}

