import { useLoaderData, useNavigate } from "react-router-dom"
import type { LoaderResponse } from "../../interfaces/product.interface"
import { Heading } from "../../components/Heading/Heading";
import styles from './Product.module.css';
import { Button } from "../../components/Button/Button";
import { cartActions } from "../../store/cart.slice";
import { useDispatch } from "react-redux";
import type { AppDispath } from "../../store/store";

export const Product = () => {

  const response = useLoaderData() as LoaderResponse;
  const product = response.data;
  const dispath = useDispatch<AppDispath>()
  const navigate = useNavigate()

  console.log(product);
  

  const backgroundStyle = product.image
  ? { backgroundImage: `url(${product.image})` }
  : undefined;

  const add = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispath(cartActions.add(product.id))
  }

  return <>
    <header className={styles['product-header']}>
      <button 
        className={styles['product-header__back']} 
        onClick={() => navigate('/')}
      >
        <img src="/public/back-ico.svg" alt="" />
      </button>
      <Heading title={product.name} level={1} />
      <Button
        small={true}
        onClick={add}
      >В корзину
      </Button>
    </header>
    <div className={styles['product']}>
      <div 
        className={styles['product__img']} 
        style={backgroundStyle}
      ></div>
      <div className={styles['product__body']}>
        <div className={styles['product__line']}>
          <div className={styles['product__title']}>Цена</div>
          <div className={styles['product__price']}>{product.price}<span> ₽</span></div>
        </div>
        <hr className={styles['product__hr']} />
        <div className={styles['product__line']}>
          <div className={styles['product__title']}>Рейтинг</div>
          <div className={styles['product__rating']}>
            {product.rating}
            <img src="/public/rating-ico2.svg" alt="" />
            </div>
        </div>
        <hr className={styles['product__hr']} />
        <div className={styles['product__structure']}>
          <div className={styles['product__structure-title']}>Состав</div>
          <ul className={styles['product__structure-list']}>
            {product.ingredients.map((ingredient, index) => (
              <li key={index} className={styles['product__structure-item']}>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </>
}
