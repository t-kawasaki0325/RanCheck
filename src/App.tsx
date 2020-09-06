import React, { useContext } from 'react';
import { store } from './store/store'
import { modalGetters } from './store/modal'
import { Home } from './pages'
import { Header, Sidebar } from './components';
import { AddSettingModal } from './components/common'

import styles from './App.css'
import 'destyle.css'
import './common.css'

const App: React.FC = () => {
  const { modal } = useContext(store)

  return (
    <>
      {modal.addSettingModal && <AddSettingModal />}
      {modalGetters(modal).allModalClosed &&
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