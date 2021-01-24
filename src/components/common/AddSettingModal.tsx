import React, { useState, ChangeEvent, useContext } from 'react'
import ModalBase from './ModalBase'
import { MESSAGE } from '../../config/message'
import { store, usersGetters } from '../../store/store'
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
  const { modal, rancheck, projects, users } = useContext(store)

  const validate = () => {
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
    setMessage(error)
    return !!error
  }

  const register = () => {
    if (validate()) {
      return
    }
    const { keywordInclLine } = registerInfo
    const { site } = projects.selectedProject
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
      type="textarea"
      titleList={['Add keyword']}
      name="keywordInclLine"
      message={message}
      buttonLabel="完了"
      modalTitle="検索キーワードを追加"
      caption="※1行ごとに1つのキーワードを入力できます"
      buttonClick={register}
      close={closeModal}
      handleChange={handleChange}
    />
  )
}
export default AddSettingModal
