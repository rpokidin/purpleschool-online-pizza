import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Heading } from "../../components/Heading/Heading";
import { Input } from "../../components/Input/Input";
import styles from './Register.module.css';
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispath, RootState } from "../../store/store";
import { register } from "../../store/user.slice";

export const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispath>()
  const jwt = useSelector((s: RootState) => s.user.jwt)

  useEffect(() => {
    if (jwt) {
      navigate('/auth/login');
    }
  }, [jwt, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email')?.toString() || '';
    const password = formData.get('password')?.toString() || '';
    const name = formData.get('name')?.toString() || '';

    if (!email || !password || !name) {
      setError("Заполните все поля");
      setIsLoading(false);
      return;
    }

    dispatch(register({ email, password, name }))

  };

  return (
    <>
      <Heading title="Регистрация" level={1} />
      {error && <div className={styles['error']}>{error}</div>}
      <form className={styles['form']} onSubmit={handleSubmit}>
        <div className={styles['form__line']}>
          <label className={styles['form__line-label']} htmlFor="email">Ваш email</label>
          <Input
            id="email"
            name="email"
            placeholder="Email"
          />
        </div>
        <div className={styles['form__line']}>
          <label className={styles['form__line-label']} htmlFor="password">Ваш пароль</label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
          />
        </div>
        <div className={styles['form__line']}>
          <label className={styles['form__line-label']} htmlFor="name">Ваше имя</label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Имя"
          />
        </div>
        <div className={styles['form__bottom']}>
          <div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Зарегистрироваться...' : 'Зарегистрироваться'}
            </Button>
          </div>
          <div>
            <p>Есть акканут?</p>
            <NavLink to='/auth/login'>Войти</NavLink>
          </div>
        </div>
      </form>
    </>
  );
};
