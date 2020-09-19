import React from 'react'

import IcnBack from '../assets/img/icn_back.svg'
import IcnPlus from '../assets/img/icn_plus-site.svg'
import styles from './Sidebar.css'

interface IProps {
  shrinkSidebar: Function
}

const SidebarSiteInfo: React.FC<IProps> = (props: IProps) => {
  const { shrinkSidebar } = props

  return (
    <div className={styles.sidebar}>
      <div onClick={() => shrinkSidebar()} className={`${styles.icon} ${styles.iconRight}`}>
        <img src={IcnBack} />
      </div>
      <div className={styles.list}>
        <div className={`${styles.item} ${styles.itemSelected}`}>memorandumrail.com</div>
      </div>
      <div className={styles.list}>
        <div className={styles.item}>memorandumrail.com</div>
      </div>
      <div className={styles.list}>
        <div className={styles.item}>memorandumrail.com</div>
      </div>
      <div className={`${styles.positionBottom} ${styles.icon} ${styles.iconLeft}`}>
        <img src={IcnPlus} />
        <span className={styles.addSiteText}>サイトを追加</span>
      </div>
    </div>
  )
}

export default SidebarSiteInfo