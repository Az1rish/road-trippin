import React, { Component } from 'react'
import { Section } from '../../components/Utils/Utils'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'


export default class RegistrationPage extends Component {
    render() {
        return (
            <Section className='uploadPage'>
                <h2>Add a photo</h2>
                <RegistrationForm
                    onRegistrationSuccess={this.handleRegistrationSuccess}
                />
            </Section>
        )
    }
}