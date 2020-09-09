import React, { useContext } from 'react';
import { IRancheckEntity } from '../usecase'
import { store } from '../store/store'
import { absVal } from '../utils/utils'

import styles from './SettingTable.css'

const SettingTable: React.FC = () => {
  const { rancheck: { settings, setRancheck } } = useContext(store)

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
            <tr key={setting._id} onMouseMove={() => setRancheck(setting)}>
              <td>{setting.keyword}</td>
              <td>{setting.site}</td>
              <td>
                {setting.latestRank()}
              </td>
              <td>
                <span>{absVal(setting.rankTransition())}</span>
                {setting.isRankUp() && <span className={styles.up}>↗</span>}
                {setting.isRankDown() && <span className={styles.down}>↘</span>}
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