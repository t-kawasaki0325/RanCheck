import React, { useState, ChangeEvent, useContext } from 'react';
import { rancheckRepository } from '../../services'

import styles from './AddSettingModal.css'
import { store } from '../../store/store'

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
          <div onClick={() => modal.closeAddSettingModal()} className={styles.modalClose}>とじる</div>
          <div className={styles.modalTitle}>項目追加</div>
          <div className={styles.modalDescription}>検索したいキーワードを追加してください</div>
          <div className={styles.modalMetaDescription}>
            ※複数行入力して追加するとキーワードを一括複数登録できます
          </div>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalItem}>
            <div className={styles.modalItemLabel}>
              <label>サイト名</label>
            </div>
            <input
              name='site'
              onChange={handleChange}
            />
          </div>
          <div className={styles.modalItem}>
            <div className={styles.modalItemLabel}>
              <label>検索キーワード</label>
            </div>
            <textarea
              rows={10}
              name='keywordInclLine'
              onChange={handleChange}
            >
          </textarea>
          </div>
          <div className={styles.modalItem}>
            <button
              className={styles.modalButton}
              onClick={register}
            >
              追加する
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default AddSettingModal