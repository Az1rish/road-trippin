import React, { Component } from 'react'
import EditForm from '../../components/EditForm/EditForm'
import { Section, Button } from '../../components/Utils/Utils'
import PhotoListContext from '../../contexts/PhotoListContext'
import PhotoContext from '../../contexts/PhotoContext'
import { withRouter } from 'react-router-dom'
import config from '../../config'
import TokenService from '../../services/token-service'
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
        error: null,
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

    
    
    render() {
        const { photo, error } = this.state

        const handleError = (error) =>  {
            this.setState({
                error
            })
        }

        function handleDeleteRequest(photoId, callback) {
            fetch(config.API_ENDPOINT + `/photos/${photoId}`, {
                method: 'DELETE',
                headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
                }
            })
                .then(res => {
                if (!res.ok) {
                    // get the error message from the response,
                    return res.json().then(error => {
                    // then throw it
                    throw error
                    })
                }
                })
                .then(data => {
                    // call the callback when the request is successful
                    // this is where the App component can remove it from state
                    callback(photoId)
                    this.props.history.push('/myPhotos')
                })
                .catch(res => {
                    handleError(res.error.message)
                })
              
        }
        return (
            <PhotoListContext.Consumer>
                {(photoListContext) => (
                    <Section className='EditPage'>
                        <div className='PhotoPage__image' style={{backgroundImage: `url(${photo.image})`}} />
                        <h2>Edit</h2>
                        <EditForm
                            onEditSuccess={this.handleEditSuccess}
                        />
                        <div role='alert'>
                            {error && <p className='red'>{error}</p>}
                        </div>
                        <Button type='button' className='deletePhoto' onClick={() => {
                            handleDeleteRequest(
                            this.state.photo.id,
                            photoListContext.deletePhoto
                            )
                        }}>Delete Photo</Button>
                    </Section>
                )}
            </PhotoListContext.Consumer> 
        )
    }
}

export default withRouter(EditPage)