import React, { useState, ChangeEvent, useContext } from 'react'
import { validationUtils, toHalfWidthSpace } from '../../utils'
import { store } from '../../store/store'
import { IProjectsEntity } from '../../usecase/'
import IcnCancel from '../../assets/img/icn_cancel.svg'

import styles from './InitialSettingModal.css'

interface IRegisterInfo {
  site: string
  keywordInclLine: string
}

const STEP = {
  SETUP_SITE: 0,
  ADD_KEYWORD: 1,
}
const ALL_STEP = Object.keys(STEP).length
const buttonText = {
  [STEP.SETUP_SITE]: 'キーワードを追加',
  [STEP.ADD_KEYWORD]: '完了',
}

const keywordsToArray = (keywordInclLine: string): string[] => {
  return keywordInclLine
    .split('\n')
    .reduce(
      (prev: string[], current: string) =>
        current.trim() !== ''
          ? prev.concat(toHalfWidthSpace(current.trim()))
          : prev,
      [],
    )
}

const showCancelButton = (projects: IProjectsEntity[]) => projects.length !== 0

const InitialSettingModal: React.FC = () => {
  const [registerInfo, setRegisterInfo] = useState<IRegisterInfo>({
    site: '',
    keywordInclLine: '',
  })
  const [step, setStep] = useState(0)
  const [message, setMessage] = useState('')
  const { rancheck, projects, modal } = useContext(store)

  const register = async () => {
    const { site, keywordInclLine } = registerInfo
    const keywords = keywordsToArray(keywordInclLine)

    projects.initProject({ site, keywords })
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setRegisterInfo({
      ...registerInfo,
      [name]: value,
    })
  }

  const validate = async () => {
    let error = ''
    if (step === STEP.SETUP_SITE) {
      error = await validationUtils.projects(registerInfo.site, projects)
    }
    if (step === STEP.ADD_KEYWORD) {
      error = validationUtils.rancheck(
        keywordsToArray(registerInfo.keywordInclLine),
        rancheck,
      )
    }
    setMessage(error)
    return !!error
  }

  const toNext = async () => {
    const isValid = !(await validate())
    if (step < ALL_STEP && isValid) {
      setStep(step => step + 1)
    }
    if (step === ALL_STEP - 1) {
      register()
    }
  }

  const isDisableButton = [
    registerInfo.site.trim() === '',
    registerInfo.keywordInclLine.trim() === '',
  ]

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div
            className={`${styles.modalHeaderStep} ${styles['modalHeaderStep-selected']}`}>
            <span className={styles.circle}>1</span>
            <span>Setup Site</span>
          </div>
          <div className={styles.modalHeaderStep}>
            <span className={styles.circle}>2</span>
            <span>Add keyword</span>
          </div>
        </div>
        <div className={styles.modalBody}>
          <div
            className={`${styles['modalItem-alignRight']} ${styles.modalCancelArea}`}>
            {showCancelButton(projects.projects) && (
              <img
                onClick={() => modal.closeInitialSettingModal()}
                src={IcnCancel}
              />
            )}
          </div>
          {message && (
            <div className={styles.errorWrapper}>
              <span className={styles.error}>{message}</span>
            </div>
          )}
          {step === STEP.SETUP_SITE && (
            <>
              <div className={styles.modalTitle}>サイトのURLを追加</div>
              <div className={styles.modalItem}>
                <input name="site" onChange={handleChange} />
              </div>
            </>
          )}
          {step === STEP.ADD_KEYWORD && (
            <>
              <div className={styles.modalTitle}>検索キーワードを追加</div>
              <div className={styles.modalItem}>
                <textarea
                  rows={10}
                  name="keywordInclLine"
                  onChange={handleChange}></textarea>
              </div>
              <div className={`${styles.modalItem} ${styles.modalItemRemarks}`}>
                <span>※1行ごとに1つのキーワードを入力できます</span>
              </div>
            </>
          )}
          <div
            className={`${styles.modalItem} ${styles['modalItem-alignRight']}`}>
            <button
              disabled={isDisableButton[step]}
              className={styles.modalButton}
              onClick={toNext}>
              {(buttonText as any)[step]}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default InitialSettingModal
