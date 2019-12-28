import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { BrowserRouter } from 'react-router-dom'
import { PhotoListProvider } from './contexts/PhotoListContext'
import { PhotoProvider } from './contexts/PhotoContext'
import './index.css'
import App from './components/App/App'

import { faStar as farStar } from "@fortawesome/free-regular-svg-icons"

import { 
    faStar as fasStar,
    faQuoteLeft
} from '@fortawesome/free-solid-svg-icons'

library.add(
    farStar,
    fasStar,
    faQuoteLeft,
)

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