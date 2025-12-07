import { useAtomValue } from 'jotai';
import { useSuspenseQuery } from '@tanstack/react-query';

import { currencyAtom } from '@/shared/atoms/currency';
import { getExchangeRate } from '@/shared/api/currency';

export function useExchangeRateOfCurrency({ price }: { price: number }) {
  const currency = useAtomValue(currencyAtom);
  const { data: exchangeRate } = useSuspenseQuery({
    queryKey: ['exchangeRate'],
    queryFn: getExchangeRate,
  });

  switch (currency) {
    // USD 가 기준 통화
    case 'USD':
      return price * exchangeRate.USD;
    case 'KRW':
      return Math.round(price * exchangeRate.KRW);
  }
}
