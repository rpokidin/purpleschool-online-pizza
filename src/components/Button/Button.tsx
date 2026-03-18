
import styles from './Button.module.css'
import type { ButtonProps } from './Button.props'
import cn from 'classnames';

/* Альтернативный вариант
import type { FC } from 'react';
export const ButtonAlt: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button className={cn('btn', className)} {...props}>{children}</button>
  )
}
*/

export const Button = ({ children, className, small, ...props }: ButtonProps) => {
  return (
    <button 
      className={cn(styles['btn'], className, {
        [styles['btn--small']]: small
      })} {...props}>{children}</button>
  )
}