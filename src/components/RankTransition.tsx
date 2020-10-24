import React, { useContext } from 'react'
import { store } from '../store/store'
import { isObjEmpty } from '../utils/utils'

import styles from './RankTransition.css'

const RankTransition: React.FC = () => {
  const {
    rancheck: { selectedSetting },
  } = useContext(store)
  return (
    <div className={styles.rankTransition}>
      <div className={styles.mainTitle}>
        <span className={styles.titleText}>Rank推移</span>
      </div>
      <div className={styles.comparisonArea}>
        <div className={styles.comparisonArea_text}>
          1週間前と比較：
          {!isObjEmpty(selectedSetting) &&
            selectedSetting.rankTransitionByWeek()}
        </div>
        <div className={styles.comparisonArea_text}>
          1ヶ月前と比較：
          {!isObjEmpty(selectedSetting) &&
            selectedSetting.rankTransitionByMonth()}
        </div>
        <div className={styles.comparisonArea_text}>
          3ヶ月前と比較：
          {!isObjEmpty(selectedSetting) &&
            selectedSetting.rankTransitionByThreeMonth()}
        </div>
        <div className={styles.comparisonArea_text}>
          半年前と比較：
          {!isObjEmpty(selectedSetting) &&
            selectedSetting.rankTransitionBySixMonth()}
        </div>
      </div>
    </div>
  )
}

export default RankTransition
