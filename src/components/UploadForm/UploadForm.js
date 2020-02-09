/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { Input, Required, Button } from '../Utils/Utils';
import PhotoApiService from '../../services/photo-api-service';
import './UploadForm.css';

export default class UploadForm extends Component {
    static defaultProps = {
      onUploadSuccess: () => {}
    }

    state = {
      error: null
    }

    handleSubmit = (ev) => {
      ev.preventDefault();

      const {
        image, title, location, description
      } = ev.target;
      const { onUploadSuccess, addLocation } = this.props;

      this.setState({ error: null });

      const newPhoto = new FormData(ev.target);

      PhotoApiService.postPhoto(newPhoto)
        .then((form) => {
          image.value = '';
          title.value = '';
          location.value = '';
          description.value = '';
          onUploadSuccess();
        })
        .then(addLocation)
        .catch((res) => {
          this.setState({ error: res.error });
        });
    }

    render() {
      const { error } = this.state;
      return (
        <form
          onSubmit={this.handleSubmit}
          className="UploadForm"
          encType="multipart/form-data"
        >
          <div role="alert">
            <p className="red">{error}</p>
          </div>
          <div className="image">
            <label htmlFor="UploadForm__image">
              Choose Photo
              {' '}
              <Required />
              <p className="instruction">Must be 4MB or less</p>
            </label>
            <Input
              name="image"
              type="file"
              required
              id="UploadForm__image"
            />
          </div>
          <div className="title">
            <label htmlFor="UploadForm__title">
              Title
              {' '}
              <Required />
            </label>
            <Input
              name="title"
              type="text"
              required
              id="UploadForm__title"
            />
          </div>
          <div className="location">
            <label htmlFor="UploadForm__location">
              Location
              {' '}
              <Required />
            </label>
            <Input
              name="location"
              type="text"
              required
              id="UploadForm__location"
            />
          </div>
          <div className="description">
            <label htmlFor="UploadForm__description">
              Description
              {' '}
              <Required />
            </label>
            <Input
              name="description"
              type="text"
              required
              id="UploadForm__description"
            />
          </div>
          <Button
            type="submit"
          >
            Add Photo
          </Button>
        </form>
      );
    }
}
