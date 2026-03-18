import { Outlet } from "react-router-dom"
import styles from './AuthLayout.module.css'

export const AuthLayout = () => {
  return (
    <div className={styles['layout']}>
      <aside className={styles['sidebar']}>
        <div className={styles['logo']}>
          <img src="/public/logo.svg" alt="" />
        </div>
      </aside>
      <main className={styles['main']}>
        <Outlet />
      </main> 
    </div>
  )
}