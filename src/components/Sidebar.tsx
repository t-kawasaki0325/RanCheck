import React, { useState } from 'react';
import SidebarShrink from './SidebarShrink'
import SidebarSiteInfo from './SidebarSiteInfo'

const Sidebar: React.FC = () => {
  const [isShrink, setIsShrink] = useState(false)

  const toggleShrink = () => {
    setIsShrink(isShrink => !isShrink)
  }

  return (
    <>
      {isShrink && <SidebarShrink expandSidebar={toggleShrink} />}
      {!isShrink && <SidebarSiteInfo shrinkSidebar={toggleShrink} />}
    </>
  )
}

export default Sidebar