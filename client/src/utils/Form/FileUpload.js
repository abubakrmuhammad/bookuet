import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTimesCircle } from '@fortawesome/fontawesome-free-solid';
import { CircularProgress } from '@material-ui/core';
import { USER_SERVER } from '../misc';

class FileUpload extends Component {
  state = {
    uploadedFiles: [],
    uploading: false
  };

  onDropHandler = files => {
    this.setState({ uploading: true });

    const formData = new FormData();
    const config = { header: { 'content-type': 'multipart/form-data' } };
    formData.append('file', files[0]);

    axios.post(`${USER_SERVER}/upload_image`, formData, config).then(response => {
      this.setState(
        {
          uploading: false,
          uploadedFiles: [...this.state.uploadedFiles, response.data]
        },
        () => this.props.imagesHandler(this.state.uploadedFiles)
      );
    });
  };

  showUploadedImagesHandler = () =>
    this.state.uploadedFiles.map(item => (
      <div className='dropzone_box uploaded_image' key={item.public_id}>
        <div className='wrap' style={{ background: `url(${item.url}) no-repeat` }}>
          <FontAwesomeIcon icon={faTimesCircle} onClick={() => this.removeImageHandler(item.public_id)} />
        </div>
      </div>
    ));

  removeImageHandler = id => {
    axios.get(`${USER_SERVER}/remove_image?public_id=${id}`).then(() => {
      const uploadedFiles = this.state.uploadedFiles.filter(item => item.public_id !== id);

      this.setState({ uploadedFiles }, () => this.props.imagesHandler(uploadedFiles));
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (props.reset) return { uploadedFiles: [] };
    else return null;
  }

  render() {
    return (
      <div>
        <section>
          <div className='dropzone clear'>
            <Dropzone
              onDrop={this.onDropHandler}
              multiple={false}
              style={{ cursor: 'pointer' }}
              className='dropzone_box'>
              <div className='wrap'>
                <FontAwesomeIcon icon={faPlusCircle} onClick={this.removeImageHandler} />
              </div>
            </Dropzone>
            {this.showUploadedImagesHandler()}
            {this.state.uploading ? (
              <div className='dropzone_box' style={{ textAlign: 'center', paddingTop: '60px' }}>
                <CircularProgress style={{ color: '#00bcd4' }} thickness={7} />
              </div>
            ) : null}
          </div>
        </section>
      </div>
    );
  }
}

export default FileUpload;
