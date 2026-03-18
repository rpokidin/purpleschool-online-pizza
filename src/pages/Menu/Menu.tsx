import { useEffect, useState, useCallback, useRef } from "react";
import type { ChangeEvent } from "react";
import { Heading } from "../../components/Heading/Heading";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { Search } from "../../components/Search/Search";
import { PREFIX } from "../../helpers/API";
import type { Product } from "../../interfaces/product.interface";
import styles from './Menu.module.css';
import axios, { AxiosError } from "axios";

const Menu = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldRestoreFocusRef = useRef<boolean>(false);
  const cursorPosRef = useRef<number>(0);

  const getMenu = useCallback(async (name?: string) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get<Product[]>(`${PREFIX}/products`, { params: { name } });
      setProducts(data);
    } catch (e: unknown) {
      if (e instanceof AxiosError && e.response?.status === 404) {
        setError('Продукты не найдены.');
      } else if (!(e instanceof Error && e.name === 'AbortError')) {
        setError('Не удалось загрузить меню. Попробуйте позже.');
      }
    } finally {
      setLoading(false);
      shouldRestoreFocusRef.current = true;
    }
  }, []);

  useEffect(() => {
    getMenu();
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [getMenu]);

  useEffect(() => {
    if (shouldRestoreFocusRef.current && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(cursorPosRef.current, cursorPosRef.current);
      shouldRestoreFocusRef.current = false;
    }
  }, [filter, products]);

  const updateFilter = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    cursorPosRef.current = e.target.selectionStart ?? value.length;
    setFilter(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => getMenu(value || undefined), 500);
  }, [getMenu]);

  if (loading) return <div className={styles.loading}>Загрузка меню...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div>
      <header className={styles['main-header']}>
        <Heading title="Меню" level={1} />
        <Search
          ref={inputRef}
          name="search"
          placeholder="Введите блюдо или состав"
          value={filter}
          onChange={updateFilter}
        />
      </header>
      <main className={styles['product-list']}>
        {products.length === 0
          ? <div className={styles['no-products']}>Продукты не найдены</div>
          : products.map(p => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                ingredients={p.ingredients}
                price={p.price}
                rating={p.rating}
                image={p.image}
              />
            ))
        }
      </main>
    </div>
  );
};

export default Menu;
