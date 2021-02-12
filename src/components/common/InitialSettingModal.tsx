import React, { useState, ChangeEvent, useContext } from 'react'
import ModalBase from './ModalBase'
import { MESSAGE } from '../../config/message'
import { validationUtils, toHalfWidthSpace } from '../../utils'
import { store, usersGetters } from '../../store/store'

interface IRegisterInfo {
  site: string
  keywordInclLine: string
}

const STEP = {
  SETUP_SITE: 0,
  ADD_KEYWORD: 1,
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

const InitialSettingModal: React.FC = () => {
  const [registerInfo, setRegisterInfo] = useState<IRegisterInfo>({
    site: '',
    keywordInclLine: '',
  })
  const [step, setStep] = useState(0)
  const [message, setMessage] = useState('')
  const { rancheck, projects, modal, users } = useContext(store)

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

  const addSiteValidate = async () => {
    let error = await validationUtils.projects(registerInfo.site, projects)
    if (
      !error &&
      usersGetters(users).currentPlan().MAX_SITE < projects.projects.length + 1
    ) {
      error = MESSAGE.INVALID_ADD_SITE(
        usersGetters(users).currentPlan().MAX_SITE,
      )
    }
    return error
  }

  const addKeywordValidate = () => {
    const keywords = keywordsToArray(registerInfo.keywordInclLine)
    let error = validationUtils.rancheck(keywords, rancheck)
    if (
      !error &&
      // TODO: 現行はサイトを1つの制約があるが本来は複数サイト存在するため修正必須
      // 実装イメージとしてはrancheckのstoreにtotalKeywordNumを追加
      usersGetters(users).currentPlan().MAX_KEYWORD <
        rancheck.settings.length + keywords.length
    ) {
      error = MESSAGE.INVALID_ADD_KEYWORD(
        usersGetters(users).currentPlan().MAX_KEYWORD,
        rancheck.settings.length,
      )
    }
    return error
  }

  const validate = async () => {
    let error = ''
    if (step === STEP.SETUP_SITE) {
      error = await addSiteValidate()
    }
    if (step === STEP.ADD_KEYWORD) {
      error = addKeywordValidate()
    }
    setMessage(error)
    return !!error
  }

  const toNext = async () => {
    if (await validate()) {
      return
    }
    if (step === STEP.SETUP_SITE) {
      setStep(current => current + 1)
    }
    if (step === STEP.ADD_KEYWORD) {
      register()
    }
  }

  const closeModal = () => modal.closeInitialSettingModal()

  const propValues = [
    {
      type: 'input',
      name: 'site',
      modalTitle: 'サイトのURLを追加',
      buttonLabel: 'キーワードを追加',
      caption: '',
    },
    {
      type: 'textarea',
      name: 'keywordInclLine',
      modalTitle: '検索キーワードを追加',
      buttonLabel: '完了',
      caption: '※1行ごとに1つのキーワードを入力できます',
    },
  ] as {
    type: 'input' | 'textarea'
    name: string
    modalTitle: string
    buttonLabel: string
    caption: string
  }[]
  const currentProp = propValues[step]

  return (
    <ModalBase
      type={currentProp.type}
      titleList={['Setup Site', 'Add keyword']}
      name={currentProp.name}
      message={message}
      modalTitle={currentProp.modalTitle}
      buttonLabel={currentProp.buttonLabel}
      currentStep={step}
      caption={currentProp.caption}
      buttonClick={toNext}
      close={closeModal}
      handleChange={handleChange}
    />
  )
}
export default InitialSettingModal
