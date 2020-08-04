import React from 'react'
import { Home } from './pages'
import { Header, Sidebar } from './components';

import 'destyle.css'

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Home />
    </>
  )
}

export default App