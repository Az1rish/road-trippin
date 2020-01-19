import React, { Component } from 'react'
import PhotoListContext from '../../contexts/PhotoListContext'
import PhotoApiService from '../../services/photo-api-service'
import { Section } from '../../components/Utils/Utils'
import Photo from '../../components/Photo/Photo'
// import AuthContext from '../../contexts/AuthContext'
// import TokenService from '../../services/token-service'
import './MyPhotosPage.css'
// import photoList from '../../store'
// import AccountButtons from '../../components/AccountButtons/AccountButtons'

export default class MyPhotosPage extends Component {
    static contextType = PhotoListContext

    componentDidMount() {
        console.log(this.context)
        this.context.clearError()
        // PhotoApiService.getPhotosByUser(this.context.user)
        PhotoApiService.getPhotos()
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
                {/* <AccountButtons /> */}
                <Section list className='MyPhotosPage'>
                    {error
                        ? <p className='red'>There was an error, try again</p>
                        : this.renderPhotos()}
                </Section>
            </>
        )
    }
}