/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import EditForm from '../../components/EditForm/EditForm';
import { Section, Button } from '../../components/Utils/Utils';
import PhotoListContext from '../../contexts/PhotoListContext';
import PhotoContext from '../../contexts/PhotoContext';
import config from '../../config';
import TokenService from '../../services/token-service';
import './EditPage.css';

class EditPage extends Component {
    static defaultProps = {
      location: {},
      history: {
        push: () => {}
      }
    }

    state = {
      photo: {},
      error: null
    }

    componentDidMount() {
      const { photo } = this.context;
      this.setState({
        photo
      });
    }

    handleEditSuccess = () => {
      const { onEditSuccess, history } = this.props;
      onEditSuccess();
      history.push('/myPhotos');
    }

    static contextType = PhotoContext;


    render() {
      const { photo, error } = this.state;

      const handleError = (err) => {
        this.setState({
          error: err
        });
      };

      const handleDeleteRequest = (photoId, callback) => {
        fetch(`${config.API_ENDPOINT}/photos/${photoId}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            authorization: `bearer ${TokenService.getAuthToken()}`
          }
        })
          .then((res) => {
            if (!res.ok) {
              // get the error message from the response,
              return res.json().then((err) => {
                // then throw it
                throw err;
              });
            }
          })
          .then((data) => {
            const { onEditSuccess, history } = this.props;
            // call the callback when the request is successful
            // this is where the App component can remove it from state
            callback(photoId);
            onEditSuccess();
            history.push('/myPhotos');
          })
          .catch((res) => {
            handleError(res.error.message);
          });
      };
      return (
        <PhotoListContext.Consumer>
          {(photoListContext) => (
            <Section className="EditPage">
              <div className="PhotoPage__image" style={{ backgroundImage: `url(${photo.image})` }} />
              <h2>Edit</h2>
              <EditForm
                onEditSuccess={this.handleEditSuccess}
              />
              <div role="alert">
                {error && <p className="red">{error}</p>}
              </div>
              <Button
                type="button"
                className="deletePhoto"
                onClick={() => {
                  handleDeleteRequest(
                    photo.id,
                    photoListContext.deletePhoto
                  );
                }}
              >
                Delete Photo
              </Button>
            </Section>
          )}
        </PhotoListContext.Consumer>
      );
    }
}

export default withRouter(EditPage);
