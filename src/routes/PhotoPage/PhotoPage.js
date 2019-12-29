import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import PhotoContext from '../../contexts/PhotoContext'
// import PhotoApiService from '../../services/photo-api-service'
import { Hyph, Section } from '../../components/Utils/Utils'
import { PhotoStarRating } from '../../components/PhotoStarRating/PhotoStarRating'
import CommentForm from '../../components/CommentForm/CommentForm'
import AccountButtons from '../../components/AccountButtons/AccountButtons'
import './PhotoPage.css'
import photoList from '../../store'

export default class PhotoPage extends Component {
    static defaultProps = {
        match: { params: {} },
    }

    

    renderPhoto() {
        const { photoId } = this.props.match.params
        const photo = photoList[photoId-1]
        return <>
            <div className='PhotoPage__image' style={{backgroundImage: `url(${photo.image})`}} />
            <h2>{photo.title}</h2>
            <PhotoContent photo={photo} />
            <PhotoComments comments={photo.comments} />
            <CommentForm />
        </>
    }

    render() {
        // console.log(this.props)
        const { error } = this.props
        const { photoId } = this.props.match.params
        const photo = photoList[photoId-1]
        let content
        if (error) {
            content = (error.error === `Photo doesn't exist`)
                ? <p className='red'>Photo not found</p>
                : <p className='red'>There was an error</p>
        } else if (!photo.id) {
            content = <div className='loading' />
        } else {
            content = this.renderPhoto()
        }
        return (
            <>
            <AccountButtons />
            <Section className='PhotoPage'>
                {content}
            </Section>
            </>
        )
    }
}

function PhotoContent ({ photo }) {
    return (
        <p className='PhotoPage__content'>
            {photo.content}
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