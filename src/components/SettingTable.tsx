import React from 'react'
import { IRancheckEntity } from '../usecase'

import styles from './SettingTable.css'

interface IProps {
  settings: IRancheckEntity[]
}

const SettingTable: React.FC<IProps> = props => {
  const { settings } = props

  return (
    <div className={styles.settingTable}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>キーワード</th>
            <th>URL</th>
            <th>Google順位</th>
            <th>Google順位変化</th>
            <th>ランクインページ</th>
          </tr>
        </thead>
        <tbody>
        {settings.map((setting: IRancheckEntity) =>
          (
            <tr key={setting._id}>
              <td>{setting.title}</td>
              <td>{setting.site}</td>
              <td>
                {setting.gRank.length > 0 ? setting.gRank[0].rank : '-'}
              </td>
              <td>
                <span>1</span>
                <span className={styles.up}>↗</span>
                <span className={styles.down}>↘</span>
              </td>
              <td>{setting.url}</td>
            </tr>
          )
        )}
        </tbody>
      </table>
    </div>
  )
}

export default SettingTable