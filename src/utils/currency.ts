export function formatPriceWithCurrency({ price, currency }: { price: number; currency: 'USD' | 'KRW' }) {
  switch (currency) {
    case 'USD':
      return `$${price.toLocaleString('en-US')}`;
    case 'KRW':
      return `${price.toLocaleString('ko-KR')}원`;
    default:
      return price;
  }
}
