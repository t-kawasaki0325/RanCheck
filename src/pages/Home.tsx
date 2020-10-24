import React, { useContext, useEffect, useState } from 'react'
import { Home } from '../layouts'
import { store } from '../store/store'

const PageHome: React.FC = () => {
  const { rancheck } = useContext(store)
  const [init, setInit] = useState(false)
  const initialize = async () => {
    await rancheck.fetchRancheck()
    setInit(true)
  }

  useEffect(() => {
    initialize()
  }, [])

  return <>{init && <Home />}</>
}

export default PageHome
