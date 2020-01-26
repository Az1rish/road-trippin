import React, { Component } from 'react'
import { Input, Button, Required } from '../Utils/Utils'
import PhotoContext from '../../contexts/PhotoContext'
import PropTypes from 'prop-types'
import config from '../../config'
import TokenService from '../../services/token-service'
import { withRouter } from 'react-router-dom'
import './EditForm.css'

class EditForm extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.object,
        }),
        history: PropTypes.shape({
            push: PropTypes.func,
        }).isRequired,
    };

    static contextType = PhotoContext;

    state = {
        error: null,
        id: '',
        title: '',
        description: '',
        location: '',
    };

    componentDidMount() {
        const { photoId } = this.props.match.params
        
        fetch(config.API_ENDPOINT + `/photos/${photoId}`, {
            method: 'GET',
            headers: {
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
                return res.json()
            })
            .then(resData => {
                this.setState({
                    id: resData.id,
                    title: resData.title,
                    description: resData.description,
                    location: resData.location,
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({ error })
            })
    }

    handleChangeTitle = e => {
        this.setState({ title: e.target.value })
    };
    
    handleChangeDescription = e => {
        this.setState({ description: e.target.value })
    };
    
    handleChangeLocation = e => {
        this.setState({ location: e.target.value })
    };
    
    handleSubmit = e => {
        e.preventDefault()
        const { photoId } = this.props.match.params
        const { id, title, description, location } = this.state
        
        const newPhoto = { id, title, description, location }
        fetch(config.API_ENDPOINT + `/photos/${photoId}`, {
            method: 'PATCH',
            body: JSON.stringify(newPhoto),
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(error => { throw error })
            })
            .then(() => {
                this.resetFields(newPhoto)
                this.context.updatePhoto(newPhoto)
                this.props.history.push('/myPhotos')
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }
    
    resetFields = (newFields) => {
        this.setState({
            id: newFields.id || '',
            title: newFields.title || '',
            description: newFields.description || '',
            location: newFields.Location || '',
        })
    }
    
    handleClickCancel = () => {
        this.props.history.push('/myPhotos')
    };

    render() {
        const { title, description, location, error } = this.state
        return (    
            <form
                className='EditPhoto__form'
                onSubmit={this.handleSubmit}
            >
                <div className='EditPhoto__error' role='alert'>
                    {error && <p>{error.message}</p>}
                </div>
                <div>
                    <label htmlFor='title'>
                        Title
                        {' '}
                        <Required />
                    </label>
                    <Input
                        type='text'
                        name='title'
                        id='title'
                        placeholder='Great website!'
                        required
                        value={title}
                        onChange={this.handleChangeTitle}
                    />
                </div>
                
                <div>
                    <label htmlFor='description'>
                        Description
                    </label>
                    <textarea
                        name='description'
                        id='description'
                        value={description}
                        onChange={this.handleChangeDescription}
                    />
                </div>
                <div>
                    <label htmlFor='location'>
                        Location
                        {' '}
                        <Required />
                    </label>
                    <Input
                        type='text'
                        name='location'
                        id='location'
                        required
                        value={location}
                        onChange={this.handleChangeLocation}
                    />
                </div>
                <div className='EditPhoto__buttons'>
                    <Button type='button' onClick={this.handleClickCancel}>
                        Cancel
                    </Button>
                    {' '}
                    <Button type='submit'>
                        Save
                    </Button>
                </div>
            </form>
        )
    }
}

export default withRouter(EditForm)