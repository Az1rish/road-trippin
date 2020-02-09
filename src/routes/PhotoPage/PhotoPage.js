/* eslint-disable import/named */
/* eslint-disable react/prop-types */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import PhotoContext from '../../contexts/PhotoContext';
import PhotoApiService from '../../services/photo-api-service';
import { Hyph, Section } from '../../components/Utils/Utils';
import { PhotoStarRating } from '../../components/PhotoStarRating/PhotoStarRating';
import CommentForm from '../../components/CommentForm/CommentForm';
import './PhotoPage.css';

export default class PhotoPage extends Component {
    state = {
      photoUser: {}
    }

    static defaultProps = {
      match: { params: {} }
    }

    componentDidMount() {
      const { match } = this.props;
      const { photoId } = match.params;
      const {
        clearError,
        setPhoto,
        setError,
        setComments
      } = this.context;
      clearError();
      PhotoApiService.getPhoto(photoId)
        .then((res) => {
          this.setState({
            photoUser: res.user
          });
        });
      PhotoApiService.getPhoto(photoId)
        .then(setPhoto)
        .catch(setError);
      PhotoApiService.getPhotoComments(photoId)
        .then(setComments)
        .catch(setError);
    }

    componentWillUnmount() {
      const { clearPhoto } = this.context;
      clearPhoto();
    }

    getUser = () => {
      const user = localStorage.getItem('user');
      return {
        user
      };
    }

    static contextType = PhotoContext

    renderPhoto() {
      const { photo, comments } = this.context;
      const { photoUser } = this.state;

      return (
        <>
          <div className="PhotoPage__image" style={{ backgroundImage: `url(${photo.image})` }} />
          <h2>{photo.title}</h2>
          <PhotoDescription photo={photo} />
          {(this.getUser().user === photoUser.user_name)
            ? <Link to={`/photo/${photo.id}/edit`} className="PhotoPage__editLink">Edit or Delete Photo</Link>
            : null}
          <PhotoComments comments={comments} />
          <CommentForm />
        </>
      );
    }

    render() {
      const { error, photo } = this.context;
      let description;
      if (error) {
        description = (error.error === 'Photo doesn\'t exist')
          ? <p className="red">Photo not found</p>
          : <p className="red">There was an error</p>;
      } else if (!photo.id) {
        description = <div className="loading" />;
      } else {
        description = this.renderPhoto();
      }
      return (
        <>
          <Section className="PhotoPage">
            {description}
          </Section>
        </>
      );
    }
}

function PhotoDescription({ photo }) {
  const postTime = new Date(photo.date_created);
  postTime.toString();
  return (
    <div className="PhotoPage__info">
      <h2 className="PhotoPage__location">
        {photo.location}
      </h2>
      <p className="PhotoPage__description">
        {photo.description}
      </p>
      <p>
        Posted by
        {' '}
        {photo.user.full_name}
        {' '}
        on
        {' '}
        {format(postTime, 'PPPP')}
      </p>
    </div>
  );
}

function PhotoComments({ comments = [] }) {
  return (
    <ul className="PhotoPage__comment-list">
      {comments.map((comment) => (
        <li key={comment.id} className="PhotoPage__comment">
          <p className="PhotoPage__comment-text">
            <FontAwesomeIcon
              size="lg"
              icon="quote-left"
              className="PhotoPage__comment-icon blue"
            />
            {comment.text}
          </p>
          <p className="PhotoPage__comment-user">
            <PhotoStarRating rating={comment.rating} />
            <Hyph />
            {comment.user.full_name}
          </p>
        </li>
      ))}
    </ul>
  );
}
