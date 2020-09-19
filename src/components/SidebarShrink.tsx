import React from 'react'

import IcnMenu from '../assets/img/icn_menu.svg'
import IcnPlus from '../assets/img/icn_plus-site.svg'
import styles from './Sidebar.css'

interface IProps {
  expandSidebar: Function
}

const SidebarShrink: React.FC<IProps> = (props: IProps) => {
  const { expandSidebar } = props

  return (
    <div className={styles.shrinkSidebar}>
      <div onClick={() => expandSidebar()} className={styles.icon}>
        <img src={IcnMenu} />
      </div>
      <div className={`${styles.icon} ${styles.positionBottom}`}>
        <img src={IcnPlus} />
      </div>
    </div>
  )
}

export default SidebarShrink