import React, { Component } from 'react'
// import PhotoListContext from '../../contexts/PhotoListContext'
// import PhotoApiService from '../../services/photo-api-service'
import { Section } from '../../components/Utils/Utils'
import Photo from '../../components/Photo/Photo'
import './AccountPage.css'
import photoList from '../../store'
import ButtonLink from '../../components/ButtonLink/ButtonLink'

export default class AccountPage extends Component {
    renderPhotos() {
        return photoList.map(photo =>
                <Photo
                    key={photo.id}
                    photo={photo}/>
                )
    }

    render() {
        const { error } = this.context
        return (
            <Section list className='AccountPage'>
                <ButtonLink
                    to='/myPhotos'
                    className='myPhotosButton'>
                        My Photos
                </ButtonLink>
                <ButtonLink
                    to='/'
                    className='logoutButton'>
                        Log Out
                </ButtonLink>
                {error
                    ? <p className='red'>There was an error, try again</p>
                    : this.renderPhotos()}
            </Section>
        )
    }
}