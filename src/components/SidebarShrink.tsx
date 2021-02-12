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
      <div
        role="button"
        tabIndex={0}
        onClick={() => expandSidebar()}
        onKeyDown={() => expandSidebar()}
        className={styles.icon}
      >
        <img src={IcnMenu} alt="Expand Sidebar" />
      </div>
      <div
        role="button"
        tabIndex={0}
        className={`${styles.icon} ${styles.positionBottom}`}
        onClick={() => openAddSiteModal()}
        onKeyDown={() => openAddSiteModal()}
      >
        <img src={IcnPlus} alt="Open Add Site Modal" />
      </div>
    </div>
  )
}

export default SidebarShrink
