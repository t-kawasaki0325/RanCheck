import React from 'react'

import IcnAnalysis from '../assets/img/icn_analysis.svg'
import IcnSearch from '../assets/img/icn_search.svg'
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