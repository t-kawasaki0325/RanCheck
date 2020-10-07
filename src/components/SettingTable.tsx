import React, { ChangeEvent, useContext, useMemo, useState } from 'react';
import { IRancheckEntity } from '../usecase'
import { store } from '../store/store'
import { absVal, range } from '../utils'
import { ContextMenu } from './common';

import styles from './SettingTable.css'

const MIN_SETTING_LENGTH = 13
const EmplySettingTable = () => (
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
)

const SettingTable: React.FC = () => {
  const { rancheck: { settings, setRancheck } } = useContext(store)
  const [contextMenu, setContextMenu] = useState({
    top: 0,
    left: 0,
    state: false
  })
  const [condition, setCondition] = useState({
    word: '',
    number: '0'
  })

  const closeContextMenu = () => {
    setContextMenu({ top: 0, left: 0, state: false })
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    const { name, value } = event.target
    setCondition(condition => ({ ...condition, [name]: value }))
  }

  const displaySettings = () => settings.filter(setting => {
    const { word, number } = condition
    return setting.wordIncludes(word)
      && (number === '0' || setting.matchKeywordNumber(parseInt(number)))
  })

  const length = displaySettings().length
  const numShortage = length > MIN_SETTING_LENGTH ? 0 : MIN_SETTING_LENGTH - length

  return (
    <div className={styles.settingTable}>
      <div className={styles.searchCondition}>
        <div className={styles.searchKeyword}>
          <input
            name='word'
            value={condition.word}
            onChange={handleChange}
          />
        </div>
        <div className={styles.searchKeywordNum}>
          <span>検索キーワード数</span>
          <select
            name='number'
            value={condition.number}
            onChange={handleChange}
          >
            <option value={0}>全て ▼</option>
            <option value={1}>1語</option>
            <option value={2}>2語</option>
            <option value={3}>3語</option>
          </select>
        </div>
      </div>
      <div className={styles.table}>
        <table>
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
          {displaySettings() && displaySettings().map((setting: IRancheckEntity) =>
            (
              <tr
                key={setting._id}
                onMouseMove={() => setRancheck(setting)}
                onContextMenu={({ pageX, pageY }) => {
                  setContextMenu({ top: pageY, left: pageX, state: true })
                }}
              >
                <td>{setting.keyword}</td>
                <td>{setting.site}</td>
                <td>
                  {setting.latestRank()}
                </td>
                <td>
                <span>
                  {absVal(setting.rankTransition())}
                </span>
                  {setting.isRankUp() && <span className={styles.up}>↗</span>}
                  {setting.isRankDown() && <span className={styles.down}>↘</span>}
                </td>
                <td>{setting.url}</td>
              </tr>
            )
          )}
          {numShortage > 0 && range(numShortage).map(
            (index: number) => <EmplySettingTable key={index} />)
          }
          </tbody>
        </table>
      </div>
      {contextMenu.state &&
        <ContextMenu
          top={contextMenu.top}
          left={contextMenu.left}
          closeContextMenu={closeContextMenu}
        />
      }
    </div>
  )
}

export default SettingTable