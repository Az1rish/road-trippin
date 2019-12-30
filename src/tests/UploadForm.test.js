import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UploadForm from './../components/UploadForm/UploadForm';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <UploadForm />
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});