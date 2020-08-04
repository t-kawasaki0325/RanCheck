import React from 'react'

// @ts-ignore
import IcnAnalysis from '../assets/img/icn_analysis.svg'
// @ts-ignore
import IcnSearch from '../assets/img/icn_search.svg'
// @ts-ignore
import styles from './Sidebar.css'

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.icon}>
        <img src={IcnAnalysis} />
      </div>
      <div className={styles.icon}>
        <img src={IcnSearch} />
      </div>
    </div>
  )
}

export default Sidebar