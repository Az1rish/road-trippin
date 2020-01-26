import React, { Component } from 'react'

const PhotoListContext = React.createContext({
    photoList: [],
    error: null,
    setError: () => {},
    clearError: () => {},
    setPhotoList: () => {},
    deletePhoto: () => {},
})
export default PhotoListContext

export class PhotoListProvider extends Component {
    state = {
        photoList: [],
        error: null,
    };

    setPhotoList = photoList => {
        this.setState({ photoList })
    }

    setError = error => {
        console.error(error)
        this.setState({ error })
    }

    clearError = () => {
        this.setState({ error: null })
    }

    deletePhoto = (photoId) => {
        const newPhotos = this.state.photoList.filter(photo =>
            photo.id !== photoId
        )
        this.setState({
            photoList: newPhotos
        })   
    }

    render() {
        const value = {
            photoList: this.state.photoList,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setPhotoList: this.setPhotoList,
            deletePhoto: this.deletePhoto,
        }
        return (
            <PhotoListContext.Provider value={value}>
                {this.props.children}
            </PhotoListContext.Provider>
        )
    }
}