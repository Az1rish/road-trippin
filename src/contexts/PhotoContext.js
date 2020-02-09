/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';

export const nullPhoto = {
  author: {},
  tags: []
};

const PhotoContext = React.createContext({
  photo: nullPhoto,
  comments: [],
  error: null,
  user: {},
  setUser: () => {},
  setError: () => {},
  clearError: () => {},
  setPhoto: () => {},
  clearPhoto: () => {},
  setComments: () => {},
  addComment: () => {},
  updatePhoto: () => {}
});

export default PhotoContext;

export class PhotoProvider extends Component {
    state = {
      photo: nullPhoto,
      error: null,
      user: {}
    };

    setUser = (user) => {
      this.setState({ user });
    }

    setError = (error) => {
      this.setState({ error });
    }

    clearError = () => {
      this.setState({ error: null });
    }

    setPhoto = (photo) => {
      this.setState({ photo });
    }

    setComments = (comments) => {
      this.setState({ comments });
    }

    clearPhoto = () => {
      this.setPhoto(nullPhoto);
      this.setComments([]);
    }

    addComment = (comment) => {
      const { comments } = this.state;
      this.setComments([
        ...comments,
        comment
      ]);
    }

    updatePhoto = (photo) => {
      this.setState({
        id: photo.id,
        title: photo.title,
        description: photo.description,
        location: photo.location
      });
    };


    render() {
      const { photo, comments, error } = this.state;
      const { children } = this.props;
      const value = {
        photo,
        comments,
        error,
        setError: this.setError,
        clearError: this.clearError,
        setPhoto: this.setPhoto,
        setComments: this.setComments,
        clearPhoto: this.clearPhoto,
        addComment: this.addComment,
        updatePhoto: this.updatePhoto
      };
      return (
        <PhotoContext.Provider value={value}>
          {children}
        </PhotoContext.Provider>
      );
    }
}
