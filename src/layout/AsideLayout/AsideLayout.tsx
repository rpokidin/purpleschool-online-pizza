import { NavLink, Outlet, useNavigate } from "react-router-dom"
import styles from './AsideLayout.module.css'
import { Button } from "../../components/Button/Button"
import { useDispatch, useSelector } from "react-redux";
import type { AppDispath, RootState } from "../../store/store";
import { getProfile, userActions } from "../../store/user.slice";
import { useEffect } from "react";

export const AsideLayout = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispath>()
  const profile = useSelector((s: RootState) => s.user.profile)
  const items = useSelector((s: RootState) => s.cart.items)

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(userActions.logout())
    navigate('/auth/login');
  };

  return (
    <div className={styles['layout']}>
      <aside className={styles['sidebar']}>
        <div className={styles['user']}>
          <div className={styles['user__avatar']}>
            <img src="/public/user.png" alt="" />
          </div>
          <div className={styles['user__name']}>
            {profile?.name}
          </div>
          <div className={styles['user__email']}>
            {profile?.email}
          </div>
        </div>
        <nav className={styles['nav']}>
          <ul>
            <li>
              <img src="/public/menu-ico.svg" alt="" />
              <NavLink to="/">Меню</NavLink>
            </li>
            <li>
              <img src="/public/cart-ico.svg" alt="" />
              <NavLink to="/cart">Корзина</NavLink>
              <span>{items.reduce((acc, item) => acc += item.count, 0)}</span>
            </li>
          </ul>
        </nav>
        <div className={styles['logout-btn']}>
          <Button small={true} onClick={handleLogout}>
            <img src="/public/exit-ico.svg" alt="" />
            Выйти
          </Button>
        </div>
      </aside> 
      <main className={styles['main']}>
        <Outlet />
      </main> 
    </div>
  )
}