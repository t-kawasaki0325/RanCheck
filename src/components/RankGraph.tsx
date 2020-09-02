import React, { useContext } from 'react';
import { Chart } from './'
import { store } from '../store/store'

import styles from './RankGraph.css'

const RankGraph: React.FC = () => {
  const { rancheck: { selectedSetting } } = useContext(store)

  return (
    <div className={styles.rankGraph}>
      <div className={styles.mainTitle}>
        <span className={styles.titleText}>{selectedSetting.keyword}</span>
      </div>
      <div className={styles.graphArea}>
        <Chart />
      </div>
    </div>
  )
}

export default RankGraph