import React, { Component } from 'react'
import EditForm from '../../components/EditForm/EditForm'
import { Section, Button } from '../../components/Utils/Utils'
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

    state = {
        photo: {},
    }

    componentDidMount() {
        const { photo } = this.context
        this.setState({
            photo
        })
    }

    handleEditSuccess = () => { 
        this.props.changeState()
        this.props.history.push('/myPhotos')
    }

    handleDelete = () => {
        
    }
    
    render() {
        const { photo } = this.state
        return (
            <Section className='EditPage'>
                <div className='PhotoPage__image' style={{backgroundImage: `url(${photo.image})`}} />
                <h2>Edit</h2>
                <EditForm
                    onEditSuccess={this.handleEditSuccess}
                />
                <Button type='button' className='deletePhoto' onClick={this.handleDelete}>Delete Photo</Button>
            </Section>
        )
    }
}

export default withRouter(EditPage)