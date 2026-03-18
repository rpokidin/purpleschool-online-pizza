export interface ProductCardProps {
  key: number,
  id: number,
  name: string,
  price: number,
  ingredients: string[],
  image: string,
  rating: number,
  className?: string,
}