import React, { useState, ChangeEvent, useContext } from 'react';
import { store } from '../../store/store'
import { validationUtils, toHalfWidthSpace } from '../../utils';

import styles from './AddSettingModal.css'
import IcnCancel from '../../assets/img/icn_cancel.svg';

interface IRegisterInfo {
  keywordInclLine: string
}

const keywordsToArray = (keywordInclLine: string): string[] => {
  return keywordInclLine.split('\n').reduce(
    (prev: string[], current: string) => current.trim() !== '' ? prev.concat(toHalfWidthSpace(current.trim())) : prev
  , [])
}

const AddSettingModal: React.FC = () => {
  const [registerInfo, setRegisterInfo] = useState<IRegisterInfo>({
    keywordInclLine: ''
  })
  const [message, setMessage] = useState('')
  const { modal, rancheck, projects } = useContext(store)

  const validate = () => {
    const error = validationUtils.rancheck(
      keywordsToArray(registerInfo.keywordInclLine),
      rancheck
    )
    setMessage(error)
    return !!error
  }

  const register = () => {
    if (validate()) {
      return
    }
    const { keywordInclLine } = registerInfo
    const site = projects.selectedProject.site
    const keywords = keywordsToArray(keywordInclLine)

    rancheck.addRancheck({ site, keywords })
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setRegisterInfo({
      ...registerInfo,
      [name]: value
    })
  }

  const closeModal = () => modal.closeAddSettingModal()

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderStep}>
            <span>Add keyword</span>
          </div>
        </div>
        <div className={styles.modalBody}>
          <div className={`${styles['modalItem-alignRight']} ${styles.modalCancelArea}`}>
            <img onClick={closeModal} src={IcnCancel} />
          </div>
          {message && (
            <div className={styles.errorWrapper}>
              <span className={styles.error}>{message}</span>
            </div>
          )}
          <div className={styles.modalTitle}>検索キーワードを追加</div>
          <div className={styles.modalItem}>
              <textarea
                rows={10}
                name='keywordInclLine'
                onChange={handleChange}
              >
              </textarea>
          </div>
          <div className={`${styles.modalItem} ${styles.modalItemRemarks}`}>
            <span>※1行ごとに1つのキーワードを入力できます</span>
          </div>
          <div className={`${styles.modalItem} ${styles['modalItem-alignRight']}`}>
            <button
              disabled={registerInfo.keywordInclLine.trim() === ''}
              className={styles.modalButton}
              onClick={register}
            >
              完了
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default AddSettingModal