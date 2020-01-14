import React, { Component } from 'react'
import { Input, Required, Button } from '../Utils/Utils'
import PhotoApiService from '../../services/photo-api-service'
// import ButtonLink from '../ButtonLink/ButtonLink'
import './UploadForm.css'

export default class UploadForm extends Component {
    static defaultProps = {
        onUploadSuccess: () => {}
    }

    state = {
        error: null,
        selectedFile: null,
    }

    fileSelectedHandler = ev => {
        this.setState({
            selectedFile: ev.target.files[0]
        })
        
    }

    handleSubmit = ev => {
        ev.preventDefault()
        console.log(this.state.selectedFile)
        const { image, title, location, description } = ev.target
        console.log(ev.target)

        this.setState({ error:null })
        const newPhoto = {
            image: this.state.selectedFile,
            location: location.value,
            description: description.value,
            title: title.value,
        }
        
        console.log(newPhoto)
        
        PhotoApiService.postPhoto(newPhoto)
            .then(photo => {
                image.value= ''
                title.value = ''
                location.value = ''
                description.value = ''
                this.props.onUploadSuccess()
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        const { error } = this.state
        return (
            <form
                className='UploadForm'>
                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <div className='image'>
                    <label htmlFor='UploadForm__image'>
                        Choose Photo <Required />
                    </label>
                    <Input
                        name='image'
                        type='file'
                        required
                        id='UploadForm__image'
                        onChange={this.fileSelectedHandler}>
                    </Input>
                </div>
                <div className='title'>
                    <label htmlFor='UploadForm__title'>
                        Title <Required />
                    </label>
                    <Input
                        name='title'
                        type='text'
                        required
                        id='UploadForm__title'>
                    </Input>
                </div>
                <div className='location'>
                    <label htmlFor='UploadForm__location'>
                        Location <Required />
                    </label>
                    <Input
                        name='location'
                        type='text'
                        required
                        id='UploadForm__location'>
                    </Input>
                </div>
                <div className='description'>
                    <label htmlFor='UploadForm__description'>
                        Description <Required />
                    </label>
                    <Input
                        name='description'
                        type='text'
                        required
                        id='UploadForm__description'>
                    </Input>
                </div>
                <Button
                    type='submit'
                    onClick={this.handleSubmit}>
                    Add Photo
                </Button>
            </form>
        )
    }
}