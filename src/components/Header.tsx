import React from 'react'

import styles from './Header.css'

interface IProps {
  site: string
}

const Header: React.FC<IProps> = props => {
  const { site } = props
  return (
    <div className={styles.header}>
      <span className={styles.headerTitle}>{site}</span>
    </div>
  )
}

export default Header
