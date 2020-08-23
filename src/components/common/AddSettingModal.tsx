import React, { useState, ChangeEvent } from 'react';
import { rancheckRepository } from '../../services'

import styles from './AddSettingModal.css'

interface IRegisterInfo {
  site: string
  keywordInclLine: string
}

const AddSettingModal: React.FC = () => {
  const [registerInfo, setRegisterInfo] = useState<IRegisterInfo>({
    site: '',
    keywordInclLine: ''
  })

  const register = () => {
    const { site, keywordInclLine } = registerInfo
    const keywords = keywordInclLine.split('\n')

    // TODO: site urlからサイトタイトルを取得する処理を追加
    const title = ''
    rancheckRepository.add(title, site, keywords)
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