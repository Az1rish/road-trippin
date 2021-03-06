/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { PhotoStarRating } from '../PhotoStarRating/PhotoStarRating';
import './Photo.css';

function readableCommentCount(number) {
  switch (number) {
    case 0:
      return 'no comments yet';

    case 1:
      return 'based on 1 review';

    default:
      return `based on ${number} reviews`;
  }
}

function truncate(text) {
  const words = text.split(' ');

  if (words.length > 10) {
    return `${words.slice(0, 10).join(' ')} ...`;
  }

  return text;
}

export default function Photo(props) {
  const { photo } = props;
  const postTime = new Date(photo.date_created);
  postTime.toString();
  return (
    <Link to={`/photo/${photo.id}`} className="Photo">
      <div className="Photo__image" style={{ backgroundImage: `url(${photo.image})` }} />

      <div className="Photo__details">
        <div className="Photo__text">
          <h2 className="Photo__heading">
            {photo.title}
          </h2>
          <h3 className="Photo__location">
            {photo.location}
          </h3>
          <p className="Photo__description">
            {truncate(photo.description)}
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

        <div className="Photo__comments">
          <PhotoStarRating rating={photo.average_comment_rating} />
          <span id="Photo__comment-count">
            {readableCommentCount(photo.number_of_comments)}
          </span>
        </div>
      </div>
    </Link>
  );
}
