/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Input, Button, Required } from '../Utils/Utils';
import config from '../../config';
import TokenService from '../../services/token-service';
import './EditForm.css';

class EditForm extends Component {
    static propTypes = {
      match: PropTypes.shape({
        params: PropTypes.object
      }),
      history: PropTypes.shape({
        push: PropTypes.func
      }).isRequired
    };

    state = {
      error: null,
      id: '',
      title: '',
      description: '',
      location: ''
    };

    componentDidMount() {
      const { match } = this.props;
      const { photoId } = match.params;

      fetch(`${config.API_ENDPOINT}/photos/${photoId}`, {
        method: 'GET',
        headers: {
          Authorization: `bearer ${TokenService.getAuthToken()}`
        }
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((error) => Promise.reject(error));
          }
          return res.json();
        })
        .then((resData) => {
          this.setState({
            id: resData.id,
            title: resData.title,
            description: resData.description,
            location: resData.location
          });
        })
        .catch((error) => {
          this.setState({ error });
        });
    }

    handleChangeTitle = (e) => {
      this.setState({ title: e.target.value });
    };

    handleChangeDescription = (e) => {
      this.setState({ description: e.target.value });
    };

    handleChangeLocation = (e) => {
      this.setState({ location: e.target.value });
    };

    handleError = (error) => {
      this.setState({
        error
      });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const { match } = this.props;
      const { photoId } = match.params;
      const { onEditSuccess } = this.props;
      const { history } = this.props;
      const {
        id, title, description, location
      } = this.state;

      const newPhoto = {
        id, title, description, location
      };
      fetch(`${config.API_ENDPOINT}/photos/${photoId}`, {
        method: 'PATCH',
        body: JSON.stringify(newPhoto),
        headers: {
          'content-type': 'application/json',
          authorization: `bearer ${TokenService.getAuthToken()}`
        }
      })
        // eslint-disable-next-line consistent-return
        .then((res) => {
          if (!res.ok) {
            return res.json().then((error) => {
              throw error;
            });
          }
        })
        .then(() => {
          this.resetFields(newPhoto);
          onEditSuccess();
          history.push('/myPhotos');
        })
        .catch((res) => {
          this.handleError(res.error.message);
        });
    }

    resetFields = (newFields) => {
      this.setState({
        id: newFields.id || '',
        title: newFields.title || '',
        description: newFields.description || '',
        location: newFields.Location || ''
      });
    }

    handleClickCancel = () => {
      const { history } = this.props;
      history.push('/myPhotos');
    };

    render() {
      const {
        title, description, location, error
      } = this.state;
      return (
        <form
          className="EditPhoto__form"
          onSubmit={this.handleSubmit}
        >
          <div className="EditPhoto__error" role="alert">
            {error && <p className="red">{error}</p>}
          </div>
          <div>
            <label htmlFor="title">
              Title
              {' '}
              <Required />
            </label>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="Great website!"
              required
              value={title}
              onChange={this.handleChangeTitle}
            />
          </div>

          <div>
            <label htmlFor="description">
              Description
            </label>

            <textarea
              name="description"
              id="description"
              className="Textarea"
              value={description}
              onChange={this.handleChangeDescription}
            />
          </div>
          <div>
            <label htmlFor="locationEdit">
              Location
              {' '}
              <Required />
            </label>
            <Input
              type="text"
              name="locationEdit"
              id="locationEdit"
              required
              value={location}
              onChange={this.handleChangeLocation}
            />
          </div>
          <div className="EditPhoto__buttons">
            <Button type="button" onClick={this.handleClickCancel}>
              Cancel
            </Button>
            {' '}
            <Button type="submit">
              Save
            </Button>
          </div>
        </form>
      );
    }
}

export default withRouter(EditForm);
