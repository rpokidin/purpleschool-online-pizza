import { forwardRef } from 'react';
import styles from './Input.module.css';
import cn from 'classnames';
import type { InputProps } from './Input.props';

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, ...props }, ref) {
	return (
		<input 
      ref={ref} 
      className={cn(styles['input'], className)} {...props} 
    />
	);
});