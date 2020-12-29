import React, { useContext } from 'react'
import { store, usersGetters } from '../../store/store'
import { NOTIFICATION } from '../../config/message'

import styles from './SettingMenu.css'

interface IProps {
  closeSettigMenu: Function
}

const SettingMenu: React.FC<IProps> = props => {
  const { closeSettigMenu } = props
  const { modal, users } = useContext(store)

  const inputToken = () => usersGetters(users).hasToken()
      ? alert(NOTIFICATION.TOKEN_ACTIVATED)
      : modal.openAddTokenModal()

  const list = [
    {
      text: 'アカウントの有効化',
      action: () => inputToken()
    }
  ]

  return (
    <div className={styles.menu}>
      <ul>
        {list.map((item, index) => {
          return (
            <li key={index} className={styles.menuItem} onClick={() => {
              // modalを閉じる
              closeSettigMenu()
              // 指定の処理
              item.action()
            }}>
              {item.text}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SettingMenu