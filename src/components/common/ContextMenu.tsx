import React from 'react'
import { rancheckRepository } from '../../services'

import styles from './ContextMenu.css'

const ContextMenu: React.FC = () => {
  const editItem = () => {}
  const deleteItem = (id: string) => {
    rancheckRepository.delete(id)
  }

  return (
    <>
      <div className={styles.overlay}></div>
      <div className={styles.contextMenu}>
        <ul>
          <li
            className={styles.menuItem}
            onClick={() => editItem()}
          >
            編集
          </li>
          <li
            className={styles.menuItem}
            onClick={() => deleteItem('LRXbXQxccTK0JBK0')}
          >
            削除
          </li>
        </ul>
      </div>
    </>
  )
}

export default ContextMenu