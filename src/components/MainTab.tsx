import React, { useState, useContext } from 'react'
import { store, usersGetters } from '../store/store'
import { SettingMenu } from './common'

import styles from './MainTab.css'
import IcnCheck from '../assets/img/icn_check.svg'
import IcnPlus from '../assets/img/icn_plus.svg'
import IcnSetting from '../assets/img/icn_setting.svg'

const MainTab: React.FC = () => {
  const { rancheck, modal, users } = useContext(store)
  const [showSettingMenu, setShowSettingMenu] = useState(false)

  const getGoogleRank = () => {
    usersGetters(users).hasToken()
      ? rancheck.downloadRank()
      : rancheck.googleSearch()
  }

  const toggleShowSettingMenu = () => setShowSettingMenu(!showSettingMenu)

  return (
    <div className={styles.mainTab}>
      <div onClick={getGoogleRank} className={styles.icon}>
        <img className={styles.iconImg} src={IcnCheck} />
        <span className={styles.iconText}>Rank Check</span>
      </div>
      <div onClick={() => modal.openAddSettingModal()} className={styles.icon}>
        <img className={styles.iconImg} src={IcnPlus} />
        <span className={styles.iconText}>Add keyword</span>
      </div>
      <div className={styles.menuWrapper}>
        <div onClick={() => toggleShowSettingMenu()} className={styles.icon}>
          <img className={styles.iconImg} src={IcnSetting} />
          <span className={styles.iconText}>Settings</span>
        </div>
        {showSettingMenu && (
          <>
            <div className={styles.overlay} onClick={() => toggleShowSettingMenu()}></div>
            <div className={styles.menu}>
              <SettingMenu
                closeSettigMenu={toggleShowSettingMenu}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MainTab
