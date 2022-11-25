import React from 'react';
import './FileUpload.css';

const FileUpload = ({readFile}) => {

  return (
    <div className='file__card'>
        <div className='file__input'>
            <input type="file" 
                onChange={ e => {
                const file = e.target.files[0];
                readFile(file);
            }}/>
            <button>
                <i>+</i>
                Upload
            </button>
        </div>
        <p className='main'>Supported Files</p>
        <p className='info'>.xlsx, .xls</p>
    </div>
  )
}

export default FileUpload