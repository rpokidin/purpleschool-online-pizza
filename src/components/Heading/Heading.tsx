import { createElement } from 'react';
import type { HeadingProps } from './Heading.props';
import styles from './Heading.module.css';

export const Heading = ({
  title,
  level = 1,
  ...props
}: HeadingProps) => {

  const tagName = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  const className = styles[tagName];

  return createElement(
    tagName,
    { 
      ...props,
      className 
    },
    title
  );
};