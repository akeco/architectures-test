import React, { useState, Fragment } from 'react';
import { uploadUserImage } from '../../api/users';
import UploadProgress from '../UploadProgress';
import { FileInput } from '@blueprintjs/core';

const FileUpload = (props) => {
  const [progress, setProgress] = useState(0);

  const uploadFile = (e) => {
    const formData = new FormData();
    const headers = {
      'content-type': 'multipart/form-data',
      onUploadProgress: progressEvent => {
        const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
        if (totalLength !== null) {
          setProgress(Math.round( (progressEvent.loaded * 100) / totalLength ))
        }
      },
    };

    formData.append('avatar', e.target.files[0]);

    uploadUserImage(formData, headers)
  };

  /*
  const onChange = (e) => {
    setFile(e.target.files[0]);
    uploadFile();
  };
   */

  return(
    <Fragment>
      <UploadProgress progress={progress} />
      <FileInput
          className={'bp3-dark'}
          //disabled={true}
          inputProps={{
            name: 'avatar',
            //accept: "image/x-png,image/gif,image/jpeg"
          }}
          text="Choose file..."
          onInputChange={uploadFile}
      />
    </Fragment>
  );
};

export default FileUpload;
