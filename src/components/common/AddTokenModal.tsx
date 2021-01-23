import React, { useState, useContext, ChangeEvent } from 'react';
import ModalBase from './ModalBase'
import { store } from '../../store/store'

import { validationUtils } from '../../utils';

const AddTokenModal: React.FC = () => {
  const [token, setToken] = useState('')
  const [message, setMessage] = useState('')
  const { modal, users } = useContext(store)

  const validate = async () => {
    const error = await validationUtils.token(token)
    setMessage(error)
    return !!error
  }

  const register = async () => {
    if (await validate()) {
      return
    }
    users.addToken(token)
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = event.target
    setToken(value)
  }

  const closeModal = () => modal.closeAddTokenModal()

  return (
    <ModalBase
      type='input'
      titleList={['Add Token']}
      name='token'
      message={message}
      modalTitle='トークンを追加'
      buttonLabel='トークンを有効化'
      buttonClick={register}
      close={closeModal}
      handleChange={handleChange}
    />
  )
}
export default AddTokenModal
