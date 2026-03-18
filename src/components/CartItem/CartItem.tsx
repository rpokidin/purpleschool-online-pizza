import styles from './CartItem.module.css';
import type { CartItemProps } from './CartItem.props';
//import { Button } from '../Button/Button';
import { useDispatch } from 'react-redux';
import type { AppDispath } from '../../store/store';
import { cartActions } from '../../store/cart.slice';

export const CartItem = (props: CartItemProps) => {

  const dispath = useDispatch<AppDispath>()

  const remove = () => {
    dispath(cartActions.remove(props.id))
  }

  const add = () => {
    dispath(cartActions.add(props.id))
  }

  const del = () => {
    dispath(cartActions.del(props.id))
  }

  const backgroundStyle = props.image
    ? { backgroundImage: `url(${props.image})` }
    : undefined;

  return (
    <div className={styles['card']}>
      <div 
        className={styles['card__img']}
        style={backgroundStyle}
      ></div>
      <div className={styles['card__body']}>
        <div className={styles['card__title']}>{props.name}</div>
        <div className={styles['card__price']}>{props.price}<span> ₽</span></div>
      </div>
      <div className={styles['card__btns']}>
        <button
          className={styles['card__btn-remove']}
          onClick={remove}
        >
          <img src="/public/remove-ico.svg" alt="" />
        </button>
        <div className={styles['card__count']}>{props.count}</div>
        <button
          className={styles['card__btn-add']}
          onClick={add}
        >
          <img src="/public/add-ico.svg" alt="" />
        </button>
        <button
          className={styles['card__btn-del']}
          onClick={del}
        >
          <img src="/public/del-ico.svg" alt="" />
        </button>
      </div>
    </div>
  );
};