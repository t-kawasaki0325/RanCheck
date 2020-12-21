import React from 'react'

import styles from './SettingMenu.css'

interface IProps {
  closeSettigMenu: Function
}

const SettingMenu: React.FC<IProps> = props => {
  const { closeSettigMenu } = props

  const inputToken = () => {
    // TODO: トークンを入力
  }

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