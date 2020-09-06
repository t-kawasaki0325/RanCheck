import React, { useContext } from 'react';
import { store } from '../store/store';

import styles from './MainTab.css'
import IcnCheck from '../assets/img/icn_check.svg'
import IcnPlus from '../assets/img/icn_plus.svg'

const MainTab: React.FC = () => {
  const { rancheck, modal } = useContext(store)
  return (
    <div className={styles.mainTab}>
      <div onClick={() => rancheck.googleSearch()} className={styles.icon}>
        <img className={styles.iconImg} src={IcnCheck} />
        <span className={styles.iconText}>Rank Check</span>
      </div>
      <div onClick={() => modal.openAddSettingModal()} className={styles.icon}>
        <img className={styles.iconImg} src={IcnPlus} />
        <span className={styles.iconText}>Add keyword</span>
      </div>
    </div>
  )
}

export default MainTab