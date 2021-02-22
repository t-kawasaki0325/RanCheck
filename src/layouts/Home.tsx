import React from 'react'
import { MainTab, RankGraph, SettingTable } from '../components'

import styles from './Home.css'

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <MainTab />
      <div className={styles.main}>
        <div>
          <SettingTable />
        </div>
        <div className={styles.boxFlex}>
          <RankGraph />
          {/* <RankTransition /> */}
        </div>
      </div>
    </div>
  )
}

export default Home
