import React from 'react';
import style from './style.module.scss';

const UploadProgress = ({ progress }) => {
    return (
        <div className={style.progress}>
            <span style={{ width: `${progress}%` }}></span>
        </div>
    )
};

export default UploadProgress;
