import React, { ChangeEvent, useContext, useState } from 'react';
import { IRancheckEntity } from '../usecase'
import { store, rancheckGetters } from '../store/store'
import { SortType } from '../store/rancheck'
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
  const {
    rancheck,
    searchStatus: { isSearching, count, totalNum}
  } = useContext(store)
  const [contextMenu, setContextMenu] = useState({
    top: 0,
    left: 0,
    state: false
  })
  const [condition, setCondition] = useState({
    word: '',
    number: '0'
  })
  const [sort, setSort] = useState<{
    type: SortType,
    rank: boolean,
    transition: boolean
  }>({
    type: '',
    rank: false,
    transition: false
  })

  const closeContextMenu = () => {
    setContextMenu({ top: 0, left: 0, state: false })
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    const { name, value } = event.target
    setCondition(condition => ({ ...condition, [name]: value }))
  }

  const changeSortSettings = (column: 'rank' | 'transition') => {
    setSort(sort => ({
      ...sort,
      type: column,
      [column]: !sort[column]
    }))
  }

  const displaySettings = () => rancheckGetters(rancheck)
    .sorted(sort.type, sort.rank, sort.transition)
    .filter(setting => {
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
        {isSearching && (
          <div className={styles.searchStatus}>
            {count} / {totalNum} 検索中…
          </div>
        )}
      </div>
      <div className={styles.table}>
        <table>
          <thead>
          <tr>
            <th>キーワード</th>
            <th
              className={styles.sort}
              onClick={() => changeSortSettings('rank')}
            >
              Google順位
            </th>
            <th
              className={styles.sort}
              onClick={() => changeSortSettings('transition')}
            >
              Google順位変化
            </th>
            <th>タイトル</th>
            <th>URL</th>
          </tr>
          </thead>
          <tbody>
          {displaySettings() && displaySettings().map((setting: IRancheckEntity) =>
            (
              <tr
                key={setting._id}
                onMouseMove={() => rancheck.setRancheck(setting)}
                onContextMenu={({ pageX, pageY }) => {
                  setContextMenu({ top: pageY, left: pageX, state: true })
                }}
              >
                <td>{setting.keyword}</td>
                <td>
                  {setting.latestRank() || '-'}
                </td>
                <td>
                <span>
                  {absVal(setting.rankTransition())}
                </span>
                  {setting.isRankUp() && <span className={styles.up}>↗</span>}
                  {setting.isRankDown() && <span className={styles.down}>↘</span>}
                </td>
                <td>{setting.title}</td>
                <td>{setting.path()}</td>
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