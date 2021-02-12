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

  const inputToken = () =>
    usersGetters(users).hasValidToken()
      ? alert(NOTIFICATION.TOKEN_ACTIVATED)
      : modal.openAddTokenModal()

  return (
    <div className={styles.menu}>
      <ul>
        <li className={styles.menuItem}>
          <span
            role="button"
            tabIndex={0}
            onClick={() => {
              // modalを閉じる
              closeSettigMenu()
              // 指定の処理
              inputToken()
            }}
            onKeyDown={() => {
              closeSettigMenu()
              inputToken()
            }}
          >
            アカウントの有効化
          </span>
        </li>
      </ul>
    </div>
  )
}

export default SettingMenu
