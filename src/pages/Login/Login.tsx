import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Heading } from "../../components/Heading/Heading";
import { Input } from "../../components/Input/Input";
import styles from './Login.module.css';
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispath, RootState } from "../../store/store";
import { login } from "../../store/user.slice";

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispath>()
  const jwt = useSelector((s: RootState) => s.user.jwt)

  useEffect(() => {
    if (jwt) {
      navigate('/')
    }
  }, [jwt, navigate])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      setError("Заполните все поля");
      setIsLoading(false);
      return;
    }

    dispatch(login({ email, password }))

  };

  return (
    <>
      <Heading title="Вход" level={1} />
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
        <div className={styles['form__bottom']}>
          <div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Вход...' : 'Вход'}
            </Button>
          </div>
          <div>
            <p>Нет аккаунта?</p>
            <NavLink to='/auth/register'>Зарегистрироваться</NavLink>
          </div>
        </div>
      </form>
    </>
  );
};
