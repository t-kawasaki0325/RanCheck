import React from 'react'

import styles from './RankTransition.css'

const RankTransition: React.FC = () => {
  return (
    <div className={styles.rankTransition}>
      <div className={styles.mainTitle}>
        <span className={styles.titleText}>Rank推移</span>
      </div>
      <div className={styles.comparisonArea}>
        <div className={styles.comparisonArea_text}>1週間前と比較：</div>
        <div className={styles.comparisonArea_text}>1ヶ月前と比較：</div>
        <div className={styles.comparisonArea_text}>3ヶ月前と比較：</div>
        <div className={styles.comparisonArea_text}>半年前と比較：</div>
      </div>
    </div>
  )
}

export default RankTransition