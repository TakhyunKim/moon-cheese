import { http } from '@/utils/http';

export const getExchangeRate = async () => {
  const response = await http.get<{ exchangeRate: { KRW: number; USD: number } }>('/api/exchange-rate');
  return response.exchangeRate;
};
