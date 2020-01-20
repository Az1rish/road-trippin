import React, { Component } from 'react'
import PhotoListContext from '../../contexts/PhotoListContext'
import PhotoApiService from '../../services/photo-api-service'
import { Section } from '../../components/Utils/Utils'
import Photo from '../../components/Photo/Photo'
import AuthContext from '../../contexts/AuthContext'
// import TokenService from '../../services/token-service'
import './MyPhotosPage.css'
// import photoList from '../../store'
// import AccountButtons from '../../components/AccountButtons/AccountButtons'

export default class MyPhotosPage extends Component {
    // static contextType = PhotoListContext

    render() {
        // 
        return (
            <AuthContext.Consumer>{(authContext) => {
                <PhotoListContext.Consumer>{(photoListContext) => {
                    componentDidMount() {
                        // console.log(this.context)
                        this.photoListContext.clearError()
                        PhotoApiService.getPhotosByUser(this.authContext.user)
                        // PhotoApiService.getPhotos()
                            .then(this.photoListContext.setPhotoList)
                            .catch(this.photoListContext.setError)
                    }
                
                    renderPhotos() {
                        const { photoList = [] } = this.photoListContext
                        return photoList.map(photo =>
                                <Photo
                                    key={photo.id}
                                    photo={photo}/>
                                )
                    }

                    return(
                        const { error } = this.context
                        <>
                            {/* <AccountButtons /> */}
                            <Section list className='MyPhotosPage'>
                                {error
                                    ? <p className='red'>There was an error, try again</p>
                                    : this.renderPhotos()}
                            </Section>
                        </> 
                    )
                }}</PhotoListContext.Consumer>
            }}</AuthContext.Consumer>
            
        )
    }
}