/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Section } from '../../components/Utils/Utils';
import UploadForm from '../../components/UploadForm/UploadForm';
import './UploadPage.css';

class UploadPage extends Component {
    static defaultProps = {
      location: {},
      history: {
        push: () => {}
      }
    }

    onUploadSuccess = () => {
      const { history } = this.props;
      history.push('/myPhotos');
    }

    render() {
      const { addLocation } = this.props;
      return (
        <Section className="uploadPage">
          <h2>Add a photo</h2>
          <UploadForm
            onUploadSuccess={this.onUploadSuccess}
            addLocation={addLocation}
          />
        </Section>
      );
    }
}

export default withRouter(UploadPage);
