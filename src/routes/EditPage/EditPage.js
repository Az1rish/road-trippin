import React, { Component } from 'react'
import EditForm from '../../components/EditForm/EditForm'
import { Section } from '../../components/Utils/Utils'
import PhotoContext from '../../contexts/PhotoContext'
import { withRouter } from 'react-router-dom'
import './EditPage.css'

class EditPage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {},
        },
    }

    static contextType = PhotoContext;

    handleEditSuccess = () => { 
        this.props.changeState()
        this.props.history.push('/myPhotos')
    }
    
    render() {
        console.log(this.context)
        const { photo } = this.context
        return (
            <Section className='EditPage'>
                <div className='PhotoPage__image' style={{backgroundImage: `url(${photo.image})`}} />
                <h2>Edit</h2>
                <EditForm
                    onEditSuccess={this.handleEditSuccess}
                />
            </Section>
        )
    }
}

export default withRouter(EditPage)