import React, { Component } from 'react'
import PhotoListContext from '../../contexts/PhotoListContext'
import PhotoApiService from '../../services/photo-api-service'
import { Section } from '../../components/Utils/Utils'
import Photo from '../../components/Photo/Photo'
import './LocationPage.css'

export default class LocationPage extends Component {
    static contextType = PhotoListContext

    componentDidMount() {
        this.context.clearError()
        PhotoApiService.getPhotosByLocation(this.props.selected)
            .then(this.context.setPhotoList)
            .catch(this.context.setError)
    }

    renderPhotos() {
        const { photoList = [] } = this.context
        return photoList.map(photo =>
                <Photo
                    key={photo.id}
                    photo={photo}/>
                )
    }

    render() {
        const { error } = this.context
        return (
            <>
                <Section list className='LocationPage'>
                    {error
                        ? <p className='red'>There was an error, try again</p>
                        : this.renderPhotos()}
                </Section>
            </>
        )
    }
}