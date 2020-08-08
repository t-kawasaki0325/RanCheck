import React from 'react'
import { Chart } from './'

import styles from './RankGraph.css'

const RankGraph: React.FC = () => {
  return (
    <div className={styles.rankGraph}>
      <div className={styles.mainTitle}>
        <span className={styles.titleText}>PHP プログラミングスクール</span>
      </div>
      <div className={styles.graphArea}>
        <Chart />
      </div>
    </div>
  )
}

export default RankGraph