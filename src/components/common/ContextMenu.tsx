import React from 'react';

import styles from './ContextMenu.css'

interface IProps {
  top: number
  left: number
  closeContextMenu: Function
}

const ContextMenu: React.FC<IProps> = (props: IProps) => {
  const { top, left, closeContextMenu } = props
  const editItem = () => {}
  const deleteItem = (id: string) => {

  }

  return (
    <>
      <div
        className={styles.overlay}
        onClick={() => closeContextMenu()}
      ></div>
      <div
        className={styles.contextMenu}
        style={{ top, left }}
      >
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