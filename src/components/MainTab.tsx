import React, { useState, useContext } from 'react'
import { store } from '../store/store'
import { SettingMenu } from './common'

import styles from './MainTab.css'
import IcnCheck from '../assets/img/icn_check.svg'
import IcnPlus from '../assets/img/icn_plus.svg'
import IcnSetting from '../assets/img/icn_setting.svg'

const MainTab: React.FC = () => {
  const { rancheck, modal } = useContext(store)
  const [showSettingMenu, setShowSettingMenu] = useState(false)

  const getGoogleRank = () => {
    rancheck.downloadRank()
    // TODO: 中の処理も含め全て削除するか決める
    // rancheck.googleSearch()
  }

  const toggleShowSettingMenu = () => setShowSettingMenu(!showSettingMenu)

  return (
    <div className={styles.mainTab}>
      <div
        role="button"
        tabIndex={0}
        onClick={getGoogleRank}
        onKeyDown={getGoogleRank}
        className={styles.icon}
      >
        <img
          // TODO: アイコンのサイズを調整する
          style={{ height: 32 }}
          className={styles.iconImg}
          src={IcnCheck}
          alt="Rank Check"
        />
        <span className={styles.iconText}>Update Rank</span>
      </div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => modal.openAddSettingModal()}
        onKeyDown={() => modal.openAddSettingModal()}
        className={styles.icon}
      >
        <img className={styles.iconImg} src={IcnPlus} alt="Add Keyword" />
        <span className={styles.iconText}>Add keyword</span>
      </div>
      <div className={styles.menuWrapper}>
        <div
          role="button"
          tabIndex={0}
          onClick={() => toggleShowSettingMenu()}
          onKeyDown={() => toggleShowSettingMenu()}
          className={styles.icon}
        >
          <img className={styles.iconImg} src={IcnSetting} alt="Settings" />
          <span className={styles.iconText}>Settings</span>
        </div>
        {showSettingMenu && (
          <>
            <div
              role="button"
              aria-label="Show Setting Menu"
              tabIndex={0}
              onClick={() => toggleShowSettingMenu()}
              onKeyDown={() => toggleShowSettingMenu()}
              className={styles.overlay}
            />
            <div className={styles.menu}>
              <SettingMenu closeSettigMenu={toggleShowSettingMenu} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MainTab
