/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import EditForm from './EditForm';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <EditForm />
    </BrowserRouter>, div
  );
  ReactDOM.unmountComponentAtNode(div);
});
