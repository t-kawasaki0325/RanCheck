import React, { useContext, useEffect, useState } from 'react';
import { store } from './store/store'
import { modalGetters } from './store/modal'
import { Home } from './pages'
import { Header, Sidebar } from './components';
import { AddSettingModal, InitialSettingModal } from './components/common'

import styles from './App.css'
import 'destyle.css'
import './common.css'

const App: React.FC = () => {
  const [init, setInit] = useState(false)
  const { modal, projects } = useContext(store)

  const initialize = async () => {
    await projects.fetchProjects()
    setInit(true)
  }

  useEffect(() => {
    initialize()
  }, [])

  return (
    <>
      {init && modal.addSettingModal && <AddSettingModal />}
      {init && modal.initialSettingModal && <InitialSettingModal />}
      {init && modalGetters(modal).allModalClosed &&
        <>
          <Header site="test" />
          <div className={styles.mainLayout}>
            <Sidebar />
            <Home />
          </div>
        </>
      }
    </>
  )
}

export default App