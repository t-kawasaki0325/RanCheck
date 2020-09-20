import React, { useState, ChangeEvent, useContext } from 'react';

import styles from './AddSettingModal.css'
import { store } from '../../store/store'
import IcnCancel from '../../assets/img/icn_cancel.svg';

interface IRegisterInfo {
  site: string
  keywordInclLine: string
}

const AddSettingModal: React.FC = () => {
  const [registerInfo, setRegisterInfo] = useState<IRegisterInfo>({
    site: '',
    keywordInclLine: ''
  })
  const { modal, rancheck } = useContext(store)

  const register = () => {
    const { site, keywordInclLine } = registerInfo
    const keywords = keywordInclLine.split('\n')

    // TODO: site urlからサイトタイトルを取得する処理を追加
    const title = ''
    rancheck.addRancheck({ title, site, keywords })
    modal.closeAddSettingModal()
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setRegisterInfo({
      ...registerInfo,
      [name]: value
    })
  }

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
            <img src={IcnCancel} />
          </div>
          <>
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
          </>
          <div className={`${styles.modalItem} ${styles['modalItem-alignRight']}`}>
            <button
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