/* eslint-disable linebreak-style */
import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { BrowserRouter } from 'react-router-dom';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import {
  faStar as fasStar,
  faQuoteLeft
} from '@fortawesome/free-solid-svg-icons';
import { PhotoListProvider } from './contexts/PhotoListContext';
import { PhotoProvider } from './contexts/PhotoContext';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';
import App from './components/App/App';


library.add(
  farStar,
  fasStar,
  faQuoteLeft
);

ReactDOM.render(
  <BrowserRouter>
    <PhotoListProvider>
      <PhotoProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </PhotoProvider>
    </PhotoListProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
