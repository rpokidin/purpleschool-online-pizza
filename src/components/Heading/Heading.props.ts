
import type { HTMLAttributes } from 'react';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  title: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}