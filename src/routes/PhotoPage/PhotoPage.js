import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PhotoContext from '../../contexts/PhotoContext'
import PhotoApiService from '../../services/photo-api-service'
import { Hyph, Section } from '../../components/Utils/Utils'
import { PhotoStarRating } from '../../components/PhotoStarRating/PhotoStarRating'
import CommentForm from '../../components/CommentForm/CommentForm'
import { format } from 'date-fns'
import './PhotoPage.css'

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
            <Link to={`/photo/${photo.id}/edit`} className='PhotoPage__editLink'>Edit Photo</Link>
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
            <Section className='PhotoPage'>
                {description}
            </Section>
            </>
        )
    }
}

function PhotoDescription ({ photo }) {
    const postTime = new Date(photo.date_created)
    postTime.toString()
    return (
        <div className='PhotoPage__info'>
            <h2 className='PhotoPage__location'>
                {photo.location}
            </h2>
            <p className='PhotoPage__description'>
                {photo.description}
            </p>
            <p>
                Posted by {photo.user.full_name} on {format(postTime, "PPPP")}
            </p>
            
        </div>
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