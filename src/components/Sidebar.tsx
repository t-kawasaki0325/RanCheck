import React, { useContext, useState } from 'react';
import SidebarShrink from './SidebarShrink'
import SidebarSiteInfo from './SidebarSiteInfo'
import { store } from '../store/store';

const Sidebar: React.FC = () => {
  const [isShrink, setIsShrink] = useState(false)
  const { projects } = useContext(store)


  const toggleShrink = () => {
    setIsShrink(isShrink => !isShrink)
  }

  return (
    <>
      {isShrink && <SidebarShrink expandSidebar={toggleShrink} />}
      {!isShrink && (
        <SidebarSiteInfo
          projects={projects.projects}
          shrinkSidebar={toggleShrink}
        />
      )}
    </>
  )
}

export default Sidebar