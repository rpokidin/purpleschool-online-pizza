import { forwardRef } from 'react';
import styles from './Search.module.css';
import cn from 'classnames';
import type { SearchProps } from './Search.props';

export const Search = forwardRef<HTMLInputElement, SearchProps>(function Search({ className, ...props }, ref) {
	return (
		<input 
      ref={ref} 
      className={cn(styles['search-input'], className)} {...props} 
    />
	);
});