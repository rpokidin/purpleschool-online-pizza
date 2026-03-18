import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  children: ReactNode,
  className?: string,
  small?: boolean
}