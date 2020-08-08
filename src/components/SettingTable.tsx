import React from 'react'

import styles from './SettingTable.css'

const SettingTable: React.FC = () => {
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
          <tr>
            <td>php プログラム</td>
            <td>https://memorandumrail.com</td>
            <td>23</td>
            <td>
              <span>1</span>
              <span className={styles.up}>↗</span>
              <span className={styles.down}>↘</span>
            </td>
            <td>https://memorandumrail.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default SettingTable