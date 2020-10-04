import React, { useContext } from 'react';
import { store } from '../../store/store';
import { DELETE_CONFIRM } from '../../config/message'

import styles from './ContextMenu.css'

interface IProps {
  top: number
  left: number
  closeContextMenu: Function
}

const ContextMenu: React.FC<IProps> = (props: IProps) => {
  const { top, left, closeContextMenu } = props
  const { rancheck } = useContext(store)

  const editItem = () => {
    closeContextMenu()
  }
  const deleteItem = () => {
    closeContextMenu()
    if (window.confirm(DELETE_CONFIRM(rancheck.selectedSetting.keyword))) {
      rancheck.deleteRancheck()
    }
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
          {/*仕様を固める必要があるため一旦コメントアウト*/}
          {/*<li*/}
          {/*  className={styles.menuItem}*/}
          {/*  onClick={() => editItem()}*/}
          {/*>*/}
          {/*  編集*/}
          {/*</li>*/}
          <li
            className={styles.menuItem}
            onClick={() => deleteItem()}
          >
            削除
          </li>
        </ul>
      </div>
    </>
  )
}

export default ContextMenu