import React, { useContext, useEffect } from 'react';
import { Home } from '../layouts'
import { store } from '../store/store';

const PageHome: React.FC = () => {
  const { rancheck } = useContext(store)
  const initialize = async () => {
    await rancheck.fetchRancheck()
  }

  useEffect(() => {
    initialize()
  }, [])

  return <Home />
}

export default PageHome