/* eslint-disable react/state-in-constructor */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

const PhotoListContext = React.createContext({
  photoList: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setPhotoList: () => {},
  deletePhoto: () => {}
});
export default PhotoListContext;

export class PhotoListProvider extends Component {
    state = {
      photoList: [],
      error: null
    };

    setPhotoList = (photoList) => {
      this.setState({ photoList });
    }

    setError = (error) => {
      this.setState({ error });
    }

    clearError = () => {
      this.setState({ error: null });
    }

    deletePhoto = (photoId) => {
      const { photoList } = this.state;
      const newPhotos = photoList.filter((photo) => photo.id !== photoId);
      this.setState({
        photoList: newPhotos
      });
    }

    render() {
      const { photoList, error } = this.state;
      const { children } = this.props;
      const value = {
        photoList,
        error,
        setError: this.setError,
        clearError: this.clearError,
        setPhotoList: this.setPhotoList,
        deletePhoto: this.deletePhoto
      };
      return (
        <PhotoListContext.Provider value={value}>
          {children}
        </PhotoListContext.Provider>
      );
    }
}
