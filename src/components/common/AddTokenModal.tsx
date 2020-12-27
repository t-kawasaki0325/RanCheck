import React, { useState, useContext, ChangeEvent } from 'react';
import { store } from '../../store/store'

import styles from './InitialSettingModal.css';
import IcnCancel from '../../assets/img/icn_cancel.svg';
import { validationUtils } from '../../utils';

const AddTokenModal: React.FC = () => {
  const [token, setToken] = useState('')
  const [message, setMessage] = useState('')
  const { modal } = useContext(store)

  const validate = async () => {
    const error = await validationUtils.token(token)
    setMessage(error)
    return !!error
  }

  const register = () => {
    if (validate()) {
      return
    }
    // TODO: tokenを保持する処理
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = event.target
    setToken(value)
  }

  const closeModal = () => modal.closeAddTokenModal()

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div
            className={styles.modalHeaderStep}>
            <span>Add Token</span>
          </div>
        </div>
        <div className={styles.modalBody}>
          <div
            className={`${styles['modalItem-alignRight']} ${styles.modalCancelArea}`}>
            <img
              onClick={closeModal}
              src={IcnCancel}
            />
          </div>
          {message && (
            <div className={styles.errorWrapper}>
              <span className={styles.error}>{message}</span>
            </div>
          )}
          <div className={styles.modalTitle}>トークンを追加</div>
          <div className={styles.modalItem}>
            <input name="token" onChange={handleChange} />
          </div>
          <div
            className={`${styles.modalItem} ${styles['modalItem-alignRight']}`}>
            <button
              className={styles.modalButton}
              onClick={register}
            >
              トークンを有効化
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default AddTokenModal
