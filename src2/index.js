import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { PhotoListProvider } from './contexts/PhotoListContext'
import { PhotoProvider } from './contexts/PhotoContext'
import './index.css'
import App from './components/App/App'

ReactDOM.render(
    <BrowserRouter>
        <PhotoListProvider>
            <PhotoProvider>
                <App />
            </PhotoProvider>
        </PhotoListProvider>
    </BrowserRouter>, 
    document.getElementById('root')
);