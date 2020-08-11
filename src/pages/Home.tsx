import React, { useEffect, useState } from 'react';
import { Home } from '../layouts'
import { rancheckRepository } from '../services'
import { IRancheckEntity } from '../usecase'

const PageHome: React.FC = () => {
  const initialize = async () => {
    const setting = await rancheckRepository.get()

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