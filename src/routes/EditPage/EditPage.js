import React, { Component } from 'react'
import EditForm from '../../components/EditForm/EditForm'
import { Section } from '../../components/Utils/Utils'
import { withRouter } from 'react-router-dom'
import './EditPage.css'

class EditPage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {},
        },
    }

    handleEditSuccess = () => { 
        this.props.changeState()
        this.props.history.push('/myPhotos')
    }
    
    render() {
        console.log(this.props)
        return (
            <Section className='EditPage'>
                <h2>Edit</h2>
                <EditForm
                    onEditSuccess={this.handleEditSuccess}
                />
            </Section>
        )
    }
}

export default withRouter(EditPage)