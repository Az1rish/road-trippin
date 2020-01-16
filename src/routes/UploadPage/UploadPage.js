import React, { Component } from 'react'
import { Section } from '../../components/Utils/Utils'
import UploadForm from '../../components/UploadForm/UploadForm'
import './UploadPage.css'

export default class UploadPage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {},
        },
    }

    onUploadSuccess = () => { 
        this.props.history.push('/myPhotos')
    }
    
    render() {
        return (
            <Section className='uploadPage'>
                <h2>Add a photo</h2>
                <UploadForm onUploadSuccess={this.onUploadSuccess} />
            </Section>
        )
    }
}