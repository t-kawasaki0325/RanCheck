import React from 'react'
import { Home } from './pages'
import { Header, Sidebar } from './components';

// @ts-ignore
import styles from './App.css'
import 'destyle.css'
import './common.css'

const App: React.FC = () => {
  return (
    <>
      <Header site="test" />
      <div className={styles.mainLayout}>
        <Sidebar />
        <Home />
      </div>
    </>
  )
}

export default App