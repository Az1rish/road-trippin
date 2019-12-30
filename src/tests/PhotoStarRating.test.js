import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import PhotoStarRating from './../components/PhotoStarRating/PhotoStarRating';

test.skip('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <PhotoStarRating />
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});