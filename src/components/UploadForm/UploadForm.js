import React, { Component } from 'react'
import { Input, Required } from '../Utils/Utils'
import AuthApiService from '../../services/auth-api-service'
import ButtonLink from '../ButtonLink/ButtonLink'

export default class UploadForm extends Component {
    static defaultProps = {
        onUploadSuccess: () => {}
    }

    state = { error: null }

    handleSubmit = ev => {
        ev.preventDefault()
        const { full_name, location, description } = ev.target

        this.setState({ error:null })
        AuthApiService.postUser({
            location: location.value,
            description: description.value,
            full_name: full_name.value,
        })
            .then(user => {
                full_name.value = ''
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
                <div className='photo'>
                    <label htmlFor='UploadForm__photo'>
                        Choose Photo <Required />
                    </label>
                    <Input
                        name='photo'
                        type='file'
                        required
                        id='UploadForm__photo'>
                    </Input>
                </div>
                <div className='location'>
                    <label                          htmlFor='UploadForm__location'>
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
                <ButtonLink
                    to='/account'
                    name='upload'>
                    Add Photo
                </ButtonLink>
            </form>
        )
    }
}