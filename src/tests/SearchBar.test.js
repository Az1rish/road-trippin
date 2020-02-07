import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SearchBar from './../components/SearchBar/SearchBar';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <SearchBar />
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
}); 