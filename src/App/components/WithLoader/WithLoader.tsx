import React from 'react'

import Loader from 'components/Loader'
import styles from 'components/WithLoader.module.scss'

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean
}>

export const WithLoader: React.FC<WithLoaderProps> = ({
  loading,
  children,
}) => {
  return (
    <div className={styles.withLoader}>
      {children}
      {loading && <Loader className={styles.content} />}
    </div>
  )
}

WithLoader.defaultProps = {
  loading: true,
}

export default WithLoader
