import styles from './ProductCard.module.css';
import cn from 'classnames';
import type { ProductCardProps } from './ProductCard.props';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import type { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispath } from '../../store/store';
import { cartActions } from '../../store/cart.slice';

export const ProductCard = (props: ProductCardProps) => {

  const dispath = useDispatch<AppDispath>()

  const add = (e: MouseEvent) => {
    e.preventDefault()
    dispath(cartActions.add(props.id))
  }

  const backgroundStyle = props.image
    ? { backgroundImage: `url(${props.image})` }
    : undefined;

  return (
    <Link to={`/product/${props.id}`} className={cn(styles['card'], props.className)}
    >
      <div 
        className={styles['card__top']}
        style={backgroundStyle}
      >
        <div className={styles['card__price']}>
          {props.price}<span> ₽</span>
        </div>
        <div className={styles['card__rating']}>{props.rating}</div>
      </div>
      <div className={styles['card__bot']}>
        <div className={styles['card__title']}>{props.name}</div>
        <div className={styles['card__desc']}>{props.ingredients.join(', ')}</div>
        <Button
          small={true}
          onClick={add}
        >В корзину
        </Button>
      </div>
    </Link>
  );
};