import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ButtonLink from './../components/ButtonLink/ButtonLink';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <ButtonLink to='/' />
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});