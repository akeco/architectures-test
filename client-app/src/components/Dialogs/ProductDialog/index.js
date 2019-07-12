import React, {Fragment, useState} from 'react';
import classnames from 'classnames';
import {
  Button,
  FileInput,
  InputGroup,
  Dialog
} from "@blueprintjs/core";
import { postProduct } from '../../../api/products';
import style from "./style.module.scss";
import UploadProgress from "../../UploadProgress";

const ProductDialog = ({ open, onClose }) => {
  const [progress, setProgress] = useState(0);
  const [isSubmited, setIsSubmited] = useState(false);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);

  const onChange = (e) => setTitle(e.target.value);
  const onInputChange = (e) => setImage(e.target.files[0]);

  const onUploadProgress = (progressEvent) => {
    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
    if (totalLength !== null) {
      console.log("PROG", ((progressEvent.loaded * 100) / totalLength));
      if(((progressEvent.loaded * 100) / totalLength)  === 100) {
        setProgress(0);
        return;
      }
      setProgress(Math.round( (progressEvent.loaded * 100) / totalLength ))
    }
  };

  const createProduct = async (formData, headers) => {
    try {
      const result = await postProduct(formData, headers);

      if(result) {
        setIsSubmited(false);
        onClose();
      }
    }
    catch(e) {

    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsSubmited(true);

    const formData = new FormData();
    const headers = {
      'content-type': 'multipart/form-data',
      onUploadProgress: onUploadProgress
    };

    formData.append('image', image);
    formData.append('title', title);

    createProduct(formData, headers)
  };

  return (
    <Fragment>
      <UploadProgress progress={progress} />
      <Dialog
        isOpen={open}
        title="Create new product"
        className={classnames('bp3-dark', style.dialogWrapper)}
        onClose={onClose}
      >
        <form
          className={style.formWrapper}
          onSubmit={onSubmit}
        >
          <InputGroup
            className={'bp3-dark'}
            type='text'
            name='title'
            placeholder='Product title'
            onChange={onChange}
          />
          <FileInput
            className={'bp3-dark'}
            inputProps={{
              name: 'product_image',
              accept: "image/x-png,image/gif,image/jpeg"
            }}
            name='image'
            text="Choose file..."
            onInputChange={onInputChange}
          /><br />
          <Button loading={isSubmited} className={'bp3-dark'} icon="upload" text="Upload product" type='submit' />
        </form>
      </Dialog>
    </Fragment>
  )
};

export default ProductDialog;
