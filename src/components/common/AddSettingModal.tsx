import React, { useState, ChangeEvent, useContext } from 'react'
import ModalBase from './ModalBase'
import { store } from '../../store/store'
import { validationUtils, toHalfWidthSpace } from '../../utils'

interface IRegisterInfo {
  keywordInclLine: string
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

const AddSettingModal: React.FC = () => {
  const [registerInfo, setRegisterInfo] = useState<IRegisterInfo>({
    keywordInclLine: '',
  })
  const [message, setMessage] = useState('')
  const { modal, rancheck, projects } = useContext(store)

  const validate = () => {
    const error = validationUtils.rancheck(
      keywordsToArray(registerInfo.keywordInclLine),
      rancheck,
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

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setRegisterInfo({
      ...registerInfo,
      [name]: value,
    })
  }

  const closeModal = () => modal.closeAddSettingModal()

  return (
    <ModalBase
      type='textarea'
      titleList={['Add keyword']}
      name='keywordInclLine'
      message={message}
      buttonLabel='完了'
      modalTitle='検索キーワードを追加'
      caption='※1行ごとに1つのキーワードを入力できます'
      buttonClick={register}
      close={closeModal}
      handleChange={handleChange}
    />
  )
}
export default AddSettingModal
