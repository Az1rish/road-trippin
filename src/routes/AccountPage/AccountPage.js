import React, { Component } from 'react'
import PhotoListContext from '../../contexts/PhotoListContext'
import PhotoApiService from '../../services/photo-api-service'
import { Section } from '../../components/Utils/Utils'
import Photo from '../../components/Photo/Photo'
import './AccountPage.css'
// import photoList from '../../store'
import AccountButtons from '../../components/AccountButtons/AccountButtons'

export default class AccountPage extends Component {    
    static contextType = PhotoListContext

    componentDidMount() {
        this.context.clearError()
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
                <AccountButtons />
                <Section list className='AccountPage'>
                    {error
                        ? <p className='red'>There was an error, try again</p>
                        : this.renderPhotos()}
                </Section>
            </>
        )
    }
}