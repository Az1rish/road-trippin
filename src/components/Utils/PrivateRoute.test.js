/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import App from '../App/App';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <App>
        <PrivateRoute />
      </App>
    </BrowserRouter>, div
  );
  ReactDOM.unmountComponentAtNode(div);
});
