import React from 'react'
import { IProjectsEntity } from '../usecase'

import IcnBack from '../assets/img/icn_back.svg'
import IcnPlus from '../assets/img/icn_plus-site.svg'
import styles from './Sidebar.css'

interface IProps {
  projects: IProjectsEntity[]
  selectedProject: IProjectsEntity
  switchProject: Function
  shrinkSidebar: Function
  openAddSiteModal: Function
}

const SidebarSiteInfo: React.FC<IProps> = (props: IProps) => {
  const {
    projects,
    selectedProject,
    switchProject,
    shrinkSidebar,
    openAddSiteModal,
  } = props

  return (
    <div className={styles.sidebar}>
      <div
        onClick={() => shrinkSidebar()}
        className={`${styles.icon} ${styles.iconRight}`}>
        <img src={IcnBack} />
      </div>
      {projects.map(project => (
        <div key={project._id} className={styles.list}>
          <div
            className={`${styles.item} ${
              project.equals(selectedProject) ? styles.itemSelected : ''
            }`}
            onClick={() => switchProject(project._id)}>
            {project.site}
          </div>
        </div>
      ))}
      <div
        className={`${styles.positionBottom} ${styles.icon} ${styles.iconLeft}`}
        onClick={() => openAddSiteModal()}>
        <img src={IcnPlus} />
        <span className={styles.addSiteText}>サイトを追加</span>
      </div>
    </div>
  )
}

export default SidebarSiteInfo
