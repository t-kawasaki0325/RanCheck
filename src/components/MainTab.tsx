import React from 'react'

// @ts-ignore
import styles from './MainTab.css'
// @ts-ignore
import IcnCheck from '../assets/img/icn_check.svg'
// @ts-ignore
import IcnPlus from '../assets/img/icn_plus.svg'

const MainTab: React.FC = () => {
  return (
    <div className={styles.mainTab}>
      <div className={styles.icon}>
        <img className={styles.iconImg} src={IcnCheck} />
        <span className={styles.iconText}>Rank Check</span>
      </div>
      <div className={styles.icon}>
        <img className={styles.iconImg} src={IcnPlus} />
        <span className={styles.iconText}>Add keyword</span>
      </div>
    </div>
  )
}

export default MainTab