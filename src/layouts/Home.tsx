import React from 'react'
import { MainTab, RankGraph, RankTransition, SettingTable } from '../components'

import styles from './Home.css'

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <MainTab />
      <div className={styles.main}>
        <div className={styles.boxFlex}>
          <RankGraph />
          <RankTransition />
        </div>
        <div>
          <SettingTable />
        </div>
      </div>
    </div>
  )
}

export default Home