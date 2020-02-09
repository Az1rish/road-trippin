/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function PhotoStarRating({ rating }) {
  const stars = [
    { filled: false },
    { filled: false },
    { filled: false },
    { filled: false },
    { filled: false }
  ];

  for (let i = 0; i < rating; i++) {
    stars[i].filled = true;
  }

  return (
    <span className="PhotoStarRating">
      { stars.map((star, index) => <Star key={index} filled={star.filled} />) }
    </span>
  );
}

export function Star({ filled }) {
  const library = filled ? 'fas' : 'far';
  return <FontAwesomeIcon className="blue" icon={[library, 'star']} />;
}
