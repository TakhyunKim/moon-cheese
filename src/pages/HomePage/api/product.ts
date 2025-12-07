import { http } from '@/utils/http';

export interface RecentProduct {
  id: number;
  thumbnail: string;
  name: string;
  price: number;
}

export const getRecentProductList = async () => {
  const response = await http.get<{ recentProducts: RecentProduct[] }>('/api/recent/product/list');
  return response.recentProducts;
};

export interface ChessProduct {
  id: number;
  name: string;
  category: 'CHEESE';
  stock: number;
  price: number;
  description: string;
  detailDescription: string;
  images: string[];
  rating: number;
}

export interface CrackerProduct {
  id: number;
  name: string;
  category: 'CRACKER';
  stock: number;
  price: number;
  description: string;
  detailDescription: string;
  images: string[];
  rating: number;
  isGlutenFree?: boolean;
}

export interface TeaProduct {
  id: number;
  name: string;
  category: 'TEA';
  stock: number;
  price: number;
  description: string;
  detailDescription: string;
  images: string[];
  rating: number;
  isCaffeineFree?: boolean;
}

export type Product = ChessProduct | CrackerProduct | TeaProduct;

export const getProductList = async () => {
  const response = await http.get<{ products: Product[] }>('/api/product/list');
  return response.products;
};
