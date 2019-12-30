import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Photo from './../components/Photo/Photo';

test.skip('renders without crashing', () => {
  const div = document.createElement('div');
  const photo = {
    id: 1,
    image: "https://images.freeimages.com/images/large-previews/6b3/jetty-at-lysterfield-lake-1640074.jpg",
    title: "Lysterfield Lake",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    number_of_comments: 4,
    average_comment_rating: 3.2,
    comments: [
        {
            id: 1,
            text:"Lorem ipsum comments...",
            rating: 4,
            user: {
                full_name: "Rick Sanchez",
            },
        },
    ],
}
  ReactDOM.render(
  <BrowserRouter>
    <Photo to={`/photo/${photo.id}`}/>
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});