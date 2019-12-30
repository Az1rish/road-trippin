import React, { Component } from 'react'
import { Section } from '../../components/Utils/Utils'
import UploadForm from '../../components/UploadForm/UploadForm'


export default class UploadPage extends Component {
    render() {
        return (
            <Section className='uploadPage'>
                <h2>Add a photo</h2>
                <UploadForm />
            </Section>
        )
    }
}