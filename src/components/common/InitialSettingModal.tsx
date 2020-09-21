import React, { useState, ChangeEvent, useContext } from 'react';
import { validationUtils } from '../../utils'
import IcnCancel from '../../assets/img/icn_cancel.svg'

import styles from './InitialSettingModal.css'
import { store } from '../../store/store'

interface IRegisterInfo {
  site: string
  keywordInclLine: string
}

const STEP = {
  SETUP_SITE: 0,
  ADD_KEYWORD: 1
}
const ALL_STEP = Object.keys(STEP).length
const buttonText = {
  [STEP.SETUP_SITE]: 'キーワードを追加',
  [STEP.ADD_KEYWORD]: '完了'
}


const InitialSettingModal: React.FC = () => {
  const [registerInfo, setRegisterInfo] = useState<IRegisterInfo>({
    site: '',
    keywordInclLine: ''
  })
  const [step, setStep] = useState(0)
  const [message, setMessage] = useState('')
  const { modal, rancheck , projects} = useContext(store)

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

  const validate = () => {
    let error = ''
    if (step === STEP.SETUP_SITE) {
      error = validationUtils.projects(registerInfo.site, projects)
    }
    if (step === STEP.ADD_KEYWORD) {
      error = validationUtils.rancheck(registerInfo.keywordInclLine, projects)
    }
    setMessage(error)
    return !!error
  }

  const toNext = () => {
     if (step < ALL_STEP && !validate()) {
       setStep(step => step + 1)
     }
     if (step === ALL_STEP) {
       register()
     }
  }

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={`${styles.modalHeaderStep} ${styles['modalHeaderStep-selected']}`}>
            <span className={styles.circle}>1</span>
            <span>Setup Site</span>
          </div>
          <div className={styles.modalHeaderStep}>
            <span className={styles.circle}>2</span>
            <span>Add keyword</span>
          </div>
        </div>
        <div className={styles.modalBody}>
          <div className={`${styles['modalItem-alignRight']} ${styles.modalCancelArea}`}>
            <img src={IcnCancel} />
          </div>
          {step === STEP.SETUP_SITE && (
            <>
              {message && <div>{message}</div>}
              <div className={styles.modalTitle}>サイトのURLを追加</div>
              <div className={styles.modalItem}>
                <input
                  name='site'
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          {step === STEP.ADD_KEYWORD && (
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
          )}
          <div className={`${styles.modalItem} ${styles['modalItem-alignRight']}`}>
            <button
              className={styles.modalButton}
              onClick={toNext}
            >
              {(buttonText as any)[step]}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default InitialSettingModal