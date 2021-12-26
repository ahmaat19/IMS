import React from 'react'
import readXlsxFile from 'read-excel-file'
import { FaFileImport, FaUpload } from 'react-icons/fa'

const UploadExcel = () => {
  return (
    <div className='mb-3'>
      <label htmlFor='formFile' className='form-label'>
        <FaUpload id='formFile' />
      </label>
      <input className='form-controls' type='file' id='formFile' />
    </div>
  )
}

export default UploadExcel
