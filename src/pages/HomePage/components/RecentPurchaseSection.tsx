import { Flex, styled } from 'styled-system/jsx';
import { Spacing, Text, AsyncBoundary } from '@/ui-lib';

import { getRecentProductList } from '../domain/product/api';

// TODO: 로딩, Error UI 보강
// TODO: 최근 구매한 상품이 없을 때 빈 상태 표시
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
            recentProductList.map(product => (
              <Flex
                key={product.id}
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
                  <Text variant="H1_Bold">{product.price}</Text>
                </Flex>
              </Flex>
            ))
          }
        </AsyncBoundary>
      </Flex>
    </styled.section>
  );
}

const recentProductListQueryOptions = {
  queryKey: ['recentProductList'] as const,
  queryFn: getRecentProductList,
};

export default RecentPurchaseSection;
