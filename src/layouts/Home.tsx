import React from 'react'
import { MainTab, RankGraph, RankTransition, SettingTable } from '../components'
import { IRancheckEntity } from '../usecase'

import styles from './Home.css'

interface IProps {
  settings: IRancheckEntity[]
}

const Home: React.FC<IProps> = props => {
  const { settings } = props

  return (
    <div className={styles.home}>
      <MainTab />
      <div className={styles.main}>
        <div className={styles.boxFlex}>
          <RankGraph />
          <RankTransition />
        </div>
        <div>
          <SettingTable
            settings={settings}
          />
        </div>
      </div>
    </div>
  )
}

export default Home