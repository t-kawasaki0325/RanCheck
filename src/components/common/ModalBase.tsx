import React, { ChangeEvent } from 'react';

import styles from './ModalBase.css';
import IcnCancel from '../../assets/img/icn_cancel.svg';

interface IProps {
  type: 'input' | 'textarea'
  title: string
  name: string
  message: string
  buttonLabel: string
  modalTitle: string
  caption?: string
  buttonClick: (event: React.MouseEvent) => void
  close: (event: any) => void
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const ModalBase: React.FC<IProps> = props => {
  const {
    type,
    title,
    name,
    message,
    modalTitle,
    caption,
    buttonLabel,
    buttonClick,
    close,
    handleChange
  } = props

  const isInput = type === 'input'
  const isTextarea = type === 'textarea'

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div
            className={styles.modalHeaderStep}>
            <span>{title}</span>
          </div>
        </div>
        <div className={styles.modalBody}>
          <div
            className={`${styles['modalItem-alignRight']} ${styles.modalCancelArea}`}>
            <img
              onClick={close}
              src={IcnCancel}
            />
          </div>
          {message && (
            <div className={styles.errorWrapper}>
              <span className={styles.error}>{message}</span>
            </div>
          )}
          <div className={styles.modalTitle}>{modalTitle}</div>
          <div className={styles.modalItem}>
            {isInput && <input name={name} onChange={handleChange} />}
            {isTextarea && (
              <textarea
                rows={10}
                name="keywordInclLine"
                onChange={handleChange}></textarea>
            )}
          </div>
          {!!caption && (
            <div className={`${styles.modalItem} ${styles.modalItemRemarks}`}>
              <span>{caption}</span>
            </div>
          )}
          <div
            className={`${styles.modalItem} ${styles['modalItem-alignRight']}`}>
            <button
              className={styles.modalButton}
              onClick={buttonClick}
            >
              {buttonLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default ModalBase
