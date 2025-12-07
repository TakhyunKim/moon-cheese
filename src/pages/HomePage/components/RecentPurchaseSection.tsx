import { Flex, styled } from 'styled-system/jsx';
import { Spacing, Text, AsyncBoundary } from '@/ui-lib';

import { getRecentProductList, type RecentProduct } from '../api/product';
import { useExchangeRateOfCurrency } from '@/hooks/useCurrency';
import { useAtomValue } from 'jotai';
import { currencyAtom } from '@/atoms/currency';
import { formatPriceWithCurrency } from '@/utils/currency';

// TODO: 로딩, Error UI 보강
// TODO: 최근 구매한 상품이 없을 때 빈 상태 표시
// TODO: 최근 구매한 상품 클릭 시 detail page 로 이동
function RecentPurchaseSection() {
  return (
    <styled.section css={{ px: 5, pt: 4, pb: 8 }}>
      <Text variant="H1_Bold">최근 구매한 상품</Text>

      <Spacing size={4} />

      <Flex
        css={{
          bg: 'background.01_white',
          px: 5,
          py: 4,
          gap: 4,
          rounded: '2xl',
        }}
        direction={'column'}
      >
        <AsyncBoundary {...recentProductListQueryOptions}>
          {recentProductList =>
            recentProductList.map(product => <RecentPurchaseProductItem key={product.id} product={product} />)
          }
        </AsyncBoundary>
      </Flex>
    </styled.section>
  );
}

function RecentPurchaseProductItem({ product }: { product: RecentProduct }) {
  const currency = useAtomValue(currencyAtom);
  const exchangeRate = useExchangeRateOfCurrency({ price: product.price });
  const formattedPrice = formatPriceWithCurrency({ price: exchangeRate, currency });

  return (
    <Flex
      css={{
        gap: 4,
      }}
    >
      <styled.img
        src={product.thumbnail}
        alt="item"
        css={{
          w: '60px',
          h: '60px',
          objectFit: 'cover',
          rounded: 'xl',
        }}
      />
      <Flex flexDir="column" gap={1}>
        <Text variant="B2_Medium">{product.name}</Text>
        <Text variant="H1_Bold">{formattedPrice}</Text>
      </Flex>
    </Flex>
  );
}

const recentProductListQueryOptions = {
  queryKey: ['recentProductList'] as const,
  queryFn: getRecentProductList,
};

export default RecentPurchaseSection;
