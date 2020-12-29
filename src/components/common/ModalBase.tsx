import React, { ChangeEvent, useContext } from 'react';
import { store } from '../../store/store'

import styles from './ModalBase.css';
import IcnCancel from '../../assets/img/icn_cancel.svg';

interface IProps {
  type: 'input' | 'textarea'
  titleList: string[]
  name: string
  message: string
  buttonLabel: string
  modalTitle: string
  caption?: string
  currentStep?: number
  buttonClick: (event: React.MouseEvent) => void
  close: (event: any) => void
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const ModalBase: React.FC<IProps> = props => {
  const {
    type,
    titleList,
    name,
    message,
    modalTitle,
    caption,
    currentStep,
    buttonLabel,
    buttonClick,
    close,
    handleChange
  } = props
  const { projects } = useContext(store)

  const isInput = type === 'input'
  const isTextarea = type === 'textarea'
  const isCurrentStep = (index: number) => currentStep === index
  const showCancelButton = projects.projects.length !== 0

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          {titleList.map((title, index) => (
            <div
              key={index}
              className={
                `${styles.modalHeaderStep} ${isCurrentStep(index) && styles['modalHeaderStep-selected']}`
              }>
              {titleList.length > 1 && (
                <span className={styles.circle}>{index + 1}</span>
              )}
              <span>{title}</span>
            </div>
          ))}
        </div>
        <div className={styles.modalBody}>
          <div
            className={`${styles['modalItem-alignRight']} ${styles.modalCancelArea}`}>
            {showCancelButton && (
              <img
                onClick={close}
                src={IcnCancel}
              />
            )}
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
