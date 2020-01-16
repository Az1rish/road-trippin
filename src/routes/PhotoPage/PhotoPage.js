import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PhotoContext from '../../contexts/PhotoContext'
import PhotoApiService from '../../services/photo-api-service'
import { Hyph, Section } from '../../components/Utils/Utils'
import { PhotoStarRating } from '../../components/PhotoStarRating/PhotoStarRating'
import CommentForm from '../../components/CommentForm/CommentForm'
// import AccountButtons from '../../components/AccountButtons/AccountButtons'
import './PhotoPage.css'
// import photoList from '../../store'

export default class PhotoPage extends Component {
    static defaultProps = {
        match: { params: {} },
    }

    static contextType = PhotoContext

    componentDidMount() {
        const { photoId } = this.props.match.params
        this.context.clearError()
        PhotoApiService.getPhoto(photoId)
            .then(this.context.setPhoto)
            .catch(this.context.setError)
        PhotoApiService.getPhotoComments(photoId)
            .then(this.context.setComments)
            .catch(this.context.setError)
    }

    componentWillUnmount() {
        this.context.clearPhoto()
    }

    renderPhoto() {
        const { photo, comments } = this.context
        return <>
            <div className='PhotoPage__image' style={{backgroundImage: `url(${photo.image})`}} />
            <h2>{photo.title}</h2>
            <PhotoDescription photo={photo} />
            <PhotoComments comments={comments} />
            <CommentForm />
        </>
    }

    render() {
        const { error, photo } = this.context
        let description
        if (error) {
            description = (error.error === `Photo doesn't exist`)
                ? <p className='red'>Photo not found</p>
                : <p className='red'>There was an error</p>
        } else if (!photo.id) {
            description = <div className='loading' />
        } else {
            description = this.renderPhoto()
        }
        return (
            <>
            {/* <AccountButtons /> */}
            <Section className='PhotoPage'>
                {description}
            </Section>
            </>
        )
    }
}

function PhotoDescription ({ photo }) {
    return (
        <p className='PhotoPage__description'>
            {photo.description}
        </p>
    )
}

function PhotoComments({ comments = [] }) {
    return (
        <ul className='PhotoPage__comment-list'>
            {comments.map(comment =>
                <li key={comment.id} className='PhotoPage__comment'>
                    <p className='PhotoPage__comment-text'>
                        <FontAwesomeIcon
                            size='lg'
                            icon='quote-left'
                            className='PhotoPage__comment-icon blue'
                        />
                        {comment.text}
                    </p>
                    <p className='PhotoPage__comment-user'>
                        <PhotoStarRating rating={comment.rating} />
                        <Hyph />
                        {comment.user.full_name}
                    </p>
                </li>
            )}
        </ul>
    )
}