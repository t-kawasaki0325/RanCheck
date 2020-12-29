import React, { useState, ChangeEvent, useContext } from 'react'
import ModalBase from './ModalBase'
import { validationUtils, toHalfWidthSpace } from '../../utils'
import { store } from '../../store/store'

interface IRegisterInfo {
  site: string
  keywordInclLine: string
}

const STEP = {
  SETUP_SITE: 0,
  ADD_KEYWORD: 1,
}
const ALL_STEP = Object.keys(STEP).length

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

  const closeModal = () => modal.closeInitialSettingModal()

  const propValues = [
    {
      type: 'input',
      name: 'site',
      modalTitle: 'サイトのURLを追加',
      buttonLabel: 'キーワードを追加',
      caption: '',
      buttonClick: () => toNext()
    },
    {
      type: 'textarea',
      name: 'keywordInclLine',
      modalTitle: '検索キーワードを追加',
      buttonLabel: '完了',
      caption: '※1行ごとに1つのキーワードを入力できます',
      buttonClick: () => register()
    }
  ] as {
    type: 'input' | 'textarea'
    name: string
    modalTitle: string
    buttonLabel: string
    caption: string
    buttonClick: (event: React.MouseEvent) => void
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
      buttonClick={currentProp.buttonClick}
      close={closeModal}
      handleChange={handleChange}
    />
  )
}
export default InitialSettingModal
