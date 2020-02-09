import React, { Component } from 'react';
import PhotoListContext from '../../contexts/PhotoListContext';
import PhotoApiService from '../../services/photo-api-service';
import { Section } from '../../components/Utils/Utils';
import Photo from '../../components/Photo/Photo';
import './MyPhotosPage.css';

export default class MyPhotosPage extends Component {
  componentDidMount() {
    const { clearError, setPhotoList, setError } = this.context;
    clearError();
    PhotoApiService.getPhotosByUser()
      .then(setPhotoList)
      .catch(setError);
  }

    static contextType = PhotoListContext

    renderPhotos() {
      const { photoList = [] } = this.context;
      return photoList.map((photo) => (
        <Photo
          key={photo.id}
          photo={photo}
        />
      ));
    }

    render() {
      const { error } = this.context;
      return (
        <>
          <Section list className="MyPhotosPage">
            {error
              ? <p className="red">There was an error, try again</p>
              : this.renderPhotos()}
          </Section>
        </>
      );
    }
}
