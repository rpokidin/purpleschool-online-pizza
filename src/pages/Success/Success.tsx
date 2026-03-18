import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Heading } from '../../components/Heading/Heading';
import styles from './Success.module.css';

export function Success() {

  const navigate = useNavigate()
  
  return (
    <div className={styles['seccess-page']}>
      <div>
        <img src="/public/seccess-pic.png" alt="" />
      </div>
      <Heading title="Ваш заказ успешно оформлен!" level={2} />
      <div>
        <Button onClick={() => navigate('/')}>Сделать новый</Button>
      </div>
    </div>
  )
}