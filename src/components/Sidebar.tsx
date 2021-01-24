import React, { useContext, useState } from 'react'
import SidebarShrink from './SidebarShrink'
import SidebarSiteInfo from './SidebarSiteInfo'
import { store } from '../store/store'

const Sidebar: React.FC = () => {
  const [isShrink, setIsShrink] = useState(false)
  const { projects, modal } = useContext(store)

  const toggleShrink = () => {
    setIsShrink(shrinkStatus => !shrinkStatus)
  }

  const openInitSettingModal = () => modal.openInitialSettingModal()

  return (
    <>
      {isShrink && (
        <SidebarShrink
          expandSidebar={toggleShrink}
          openAddSiteModal={openInitSettingModal}
        />
      )}
      {!isShrink && (
        <SidebarSiteInfo
          projects={projects.projects}
          selectedProject={projects.selectedProject}
          switchProject={projects.switchProjects}
          shrinkSidebar={toggleShrink}
          openAddSiteModal={openInitSettingModal}
        />
      )}
    </>
  )
}

export default Sidebar
