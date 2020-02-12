/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import PhotoStarRating from './PhotoStarRating';

test.skip('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <PhotoStarRating />
    </BrowserRouter>, div
  );
  ReactDOM.unmountComponentAtNode(div);
});
