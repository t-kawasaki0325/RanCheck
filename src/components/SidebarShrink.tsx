import React from 'react'

import IcnMenu from '../assets/img/icn_menu.svg'
import IcnPlus from '../assets/img/icn_plus-site.svg'
import styles from './Sidebar.css'

interface IProps {
  expandSidebar: Function
  openAddSiteModal: Function
}

const SidebarShrink: React.FC<IProps> = (props: IProps) => {
  const { expandSidebar, openAddSiteModal } = props

  return (
    <div className={styles.shrinkSidebar}>
      <div onClick={() => expandSidebar()} className={styles.icon}>
        <img src={IcnMenu} />
      </div>
      <div
        className={`${styles.icon} ${styles.positionBottom}`}
        onClick={() => openAddSiteModal()}
      >
        <img src={IcnPlus} />
      </div>
    </div>
  )
}

export default SidebarShrink