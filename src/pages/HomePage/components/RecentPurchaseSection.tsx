import { Flex, styled } from 'styled-system/jsx';
import { Spacing, Text } from '@/ui-lib';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getRecentProductList } from '../domain/product/api';

function RecentPurchaseSection() {
  const { data: recentProductList } = useSuspenseQuery({
    queryKey: ['recentProductList'],
    queryFn: getRecentProductList,
  });

  if (recentProductList.length === 0) {
    return <EmptyRecentPurchaseSection />;
  }

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
        {recentProductList.map(product => (
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
        ))}
      </Flex>
    </styled.section>
  );
}

function EmptyRecentPurchaseSection() {
  return (
    <styled.div p={5} aspectRatio={1} bgColor="background.01_white">
      <Text variant="B2_Bold">최근 구매한 상품이 없어요</Text>
    </styled.div>
  );
}

export default RecentPurchaseSection;
