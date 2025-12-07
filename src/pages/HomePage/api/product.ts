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
