import { useDispatch, useSelector } from "react-redux";
import { Heading } from "../../components/Heading/Heading";
import type { AppDispath, RootState } from "../../store/store";
import { CartItem } from "../../components/CartItem/CartItem";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "../../interfaces/product.interface";
import axios from "axios";
import { PREFIX } from "../../helpers/API"; // Исправлено имя
import styles from './Cart.module.css';
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart.slice";

const DELIVERY_PRICE = 169;

export const Cart = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Обработка ошибок

  const items = useSelector((state: RootState) => state.cart.items);
  const jwt = useSelector((state: RootState) => state.user.jwt);
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispath>()

  // Оптимизируем вычисление total с помощью useMemo
  const total = useMemo(() => {
    return items.reduce((sum, cartItem) => {
      const product = cartProducts.find(p => p.id === cartItem.id);
      if (!product) return sum; // Пропускаем, если товар не загружен
      return sum + cartItem.count * product.price;
    }, 0);
  }, [items, cartProducts]); // Зависимости для пересчёта

  const getItem = async (id: number): Promise<Product> => {
    const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
    return data;
  };

  const checkout = async () => {
    await axios.post(`${PREFIX}/order`, {
      products: items
    }, {
      headers: {
          Authorization: `Bearer ${jwt}`
      }
    })
    dispatch(cartActions.clean())
    navigate('/success')
  };

  useEffect(() => {
    if (items.length === 0) {
      setCartProducts([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    const loadAllItems = async () => {
      try {
        const res = await Promise.all(items.map(i => getItem(i.id)));
        setCartProducts(res);
      } catch (err) {
        console.error('Ошибка загрузки товаров:', err);
        setError('Не удалось загрузить товары. Попробуйте обновить страницу.');
      } finally {
        setIsLoading(false);
      }
    };

    loadAllItems();
  }, [items]); // Перезагружаем при изменении items

  // Если корзина пуста — показываем сообщение
  if (items.length === 0) {
    return (
      <>
        <Heading title="Корзина" level={1} />
        <div className={styles['empty-cart']}>
          <p>Ваша корзина пуста</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Heading title="Корзина" level={1} />
      
      {isLoading && <div className={styles['loading']}>Загружаем товары...</div>}
      {error && <div className={styles['error']}>{error}</div>}

      <div className={styles['card-list']}>
        {items.map(cartItem => {
          const product = cartProducts.find(p => p.id === cartItem.id);
          if (!product) {
            // Если товар не загружен, показываем заглушку
            return (
              <div key={cartItem.id} className={styles['cart-item-loading']}>
                <span>Загружается...</span>
              </div>
            );
          }
          return (
            <CartItem
              key={cartItem.id}
              count={cartItem.count}
              {...product}
            />
          );
        })}
      </div>

      <div className={styles['result-list']}>
        <div>
          <div className={styles['result__title']}>Итог</div>
          <div className={styles['result__price']}>{total}<span> ₽</span></div>
        </div>
        <hr className={styles['result__hr']} />
        <div>
          <div className={styles['result__title']}>Доставка</div>
          <div className={styles['result__price']}>{DELIVERY_PRICE}<span> ₽</span></div>
        </div>
        <hr className={styles['result__hr']} />
        <div>
          <div className={styles['result__title']}>
            Итог <span className={styles['result__length']}>({items.length})</span>
          </div>
          <div className={styles['result__price']}>
            {total + DELIVERY_PRICE}<span> ₽</span>
          </div>
        </div>
      </div>

      <div>
        <Button onClick={checkout}>Оформить заказ</Button>
      </div>
    </>
  );
};
