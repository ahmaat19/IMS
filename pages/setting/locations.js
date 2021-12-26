import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import withAuth from '../../HOC/withAuth'
import Message from '../../components/Message'
import Loader from 'react-loader-spinner'
import {
  FaCheckCircle,
  FaPenAlt,
  FaPlus,
  FaTimesCircle,
  FaTrash,
} from 'react-icons/fa'

import useLocations from '../../api/locations'

import { confirmAlert } from 'react-confirm-alert'
import { Confirm } from '../../components/Confirm'
import { useForm } from 'react-hook-form'
import {
  inputCheckBox,
  inputFile,
  inputText,
  inputTextArea,
} from '../../utils/dynamicForm'

const Location = () => {
  const { getLocations, updateLocation, addLocation, deleteLocation } =
    useLocations()
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
    },
  })

  const { data, isLoading, isError, error } = getLocations

  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
    mutateAsync: updateMutateAsync,
  } = updateLocation

  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    error: errorDelete,
    isSuccess: isSuccessDelete,
    mutateAsync: deleteMutateAsync,
  } = deleteLocation

  const {
    isLoading: isLoadingAdd,
    isError: isErrorAdd,
    error: errorAdd,
    isSuccess: isSuccessAdd,
    mutateAsync: addMutateAsync,
  } = addLocation

  const [id, setId] = useState(null)
  const [edit, setEdit] = useState(false)

  const formCleanHandler = () => {
    setEdit(false)
    reset()
  }

  useEffect(() => {
    if (isSuccessAdd || isSuccessUpdate) formCleanHandler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessAdd, isSuccessUpdate])

  const deleteHandler = (id) => {
    confirmAlert(Confirm(() => deleteMutateAsync(id)))
  }

  const submitHandler = async (data) => {
    edit
      ? updateMutateAsync({
          _id: id,
          name: data.name,
          description: data.description,
          isActive: data.isActive,
        })
      : addMutateAsync(data)
  }

  const editHandler = (location) => {
    setId(location._id)
    setEdit(true)
    setValue('name', location.name)
    setValue('description', location.description)
    setValue('isActive', location.isActive)
  }

  return (
    <>
      <Head>
        <title>Location</title>
        <meta property='og:title' content='Location' key='title' />
      </Head>
      {isSuccessUpdate && (
        <Message variant='success'>
          Location has been updated successfully.
        </Message>
      )}
      {isErrorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {isSuccessAdd && (
        <Message variant='success'>
          Location has been Created successfully.
        </Message>
      )}
      {isErrorAdd && <Message variant='danger'>{errorAdd}</Message>}
      {isSuccessDelete && (
        <Message variant='success'>
          Location has been deleted successfully.
        </Message>
      )}
      {isErrorDelete && <Message variant='danger'>{errorDelete}</Message>}
      <div
        className='modal fade'
        id='editLocationModal'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='editLocationModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content modal-background'>
            <div className='modal-header'>
              <h3 className='modal-title ' id='editLocationModalLabel'>
                {edit ? 'Edit Location' : 'Add Location'}
              </h3>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={formCleanHandler}
              ></button>
            </div>
            <div className='modal-body'>
              {isLoading ? (
                <div className='text-center'>
                  <Loader
                    type='ThreeDots'
                    color='#00BFFF'
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                  />
                </div>
              ) : isError ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <form onSubmit={handleSubmit(submitHandler)}>
                  {inputText({ register, label: 'Name', errors, name: 'name' })}
                  {inputTextArea({
                    register,
                    label: 'Description',
                    errors,
                    name: 'description',
                  })}
                  <div className='row'>
                    <div className='col'>
                      {inputCheckBox({
                        register,
                        errors,
                        label: 'isActive',
                        name: 'isActive',
                        isRequired: false,
                      })}
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-secondary '
                      data-bs-dismiss='modal'
                      onClick={formCleanHandler}
                    >
                      Close
                    </button>
                    <button
                      type='submit'
                      className='btn btn-primary '
                      disabled={isLoadingAdd || isLoadingUpdate}
                    >
                      {isLoadingAdd || isLoadingUpdate ? (
                        <span className='spinner-border spinner-border-sm' />
                      ) : (
                        'Submit'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='position-relative'>
        <button
          className='btn btn-primary position-fixed rounded-3'
          style={{
            bottom: '20px',
            right: '20px',
          }}
          data-bs-toggle='modal'
          data-bs-target='#editLocationModal'
        >
          <FaPlus className='mb-1' />
        </button>
      </div>

      <div className='row mt-2'>
        <div className='col-md-4 col-6 me-auto'>
          <h3 className='fw-light font-monospace'>Locations</h3>
        </div>

        {/* <div className='col-md-4 col-6 ms-auto'>
          <UploadExcel />
        </div> */}
      </div>

      {isLoading ? (
        <div className='text-center'>
          <Loader
            type='ThreeDots'
            color='#00BFFF'
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </div>
      ) : isError ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className='table-responsive '>
            <table className='table table-sm hover bordered table-striped caption-top '>
              <caption>{data && data.length} records were found</caption>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((location) => (
                    <tr key={location._id}>
                      <td>{location.name}</td>
                      <td>{location.description}</td>
                      <td>
                        {location.isActive ? (
                          <FaCheckCircle className='text-success mb-1' />
                        ) : (
                          <FaTimesCircle className='text-danger mb-1' />
                        )}
                      </td>

                      <td className='btn-location'>
                        <button
                          className='btn btn-primary btn-sm rounded-pill '
                          onClick={() => editHandler(location)}
                          data-bs-toggle='modal'
                          data-bs-target='#editLocationModal'
                        >
                          <FaPenAlt />
                        </button>

                        <button
                          className='btn btn-danger btn-sm rounded-pill ms-1'
                          onClick={() => deleteHandler(location._id)}
                          disabled={isLoadingDelete}
                        >
                          {isLoadingDelete ? (
                            <span className='spinner-border spinner-border-sm' />
                          ) : (
                            <span>
                              {' '}
                              <FaTrash />
                            </span>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  )
}

export default dynamic(() => Promise.resolve(withAuth(Location)), {
  ssr: false,
})
