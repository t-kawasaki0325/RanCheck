import React, { useContext, useEffect, useState } from 'react';
import { Home } from '../layouts'
import { rancheckRepository } from '../services'
import { IRancheckEntity } from '../usecase'
import { store } from '../store/store';

const PageHome: React.FC = () => {
  const { rancheck } = useContext(store)
  const initialize = async () => {
    const setting = await rancheckRepository.get()
    await rancheck.fetchRancheck()

    setSettings(setting)
  }

  const [settings, setSettings] = useState<IRancheckEntity[]>([])
  useEffect(() => {
    initialize()
  }, [])

  return (
      <Home
        settings={settings}
      />
  )
}

export default PageHome