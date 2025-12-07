import { Counter, SubGNB, Text, AsyncBoundary } from '@/ui-lib';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, Grid, styled } from 'styled-system/jsx';
import { useAtomValue } from 'jotai';
import { currencyAtom } from '@/shared/atoms/currency';
import { useExchangeRateOfCurrency } from '@/shared/hooks/useCurrency';
import { formatPriceWithCurrency } from '@/utils/currency';

import ProductItem from '../components/ProductItem';
import { getProductList, type Product } from '../api/product';

import type { UseSuspenseQueryOptions } from '@tanstack/react-query';

type Category = 'all' | 'CHEESE' | 'CRACKER' | 'TEA';

function ProductListSection() {
  const [currentTab, setCurrentTab] = useState<Category>('all');

  return (
    <styled.section bg="background.01_white">
      <Box css={{ px: 5, pt: 5, pb: 4 }}>
        <Text variant="H1_Bold">판매중인 상품</Text>
      </Box>
      <SubGNB.Root value={currentTab} onValueChange={details => setCurrentTab(details.value as Category)}>
        <SubGNB.List>
          <SubGNB.Trigger value="all">전체</SubGNB.Trigger>
          <SubGNB.Trigger value="CHEESE">치즈</SubGNB.Trigger>
          <SubGNB.Trigger value="CRACKER">크래커</SubGNB.Trigger>
          <SubGNB.Trigger value="TEA">티</SubGNB.Trigger>
        </SubGNB.List>
      </SubGNB.Root>
      <Grid gridTemplateColumns="repeat(2, 1fr)" rowGap={9} columnGap={4} p={5}>
        <AsyncBoundary {...productListQueryOptions(currentTab)}>
          {products => products.map(product => <ProductCard key={product.id} product={product} />)}
        </AsyncBoundary>
      </Grid>
    </styled.section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const currency = useAtomValue(currencyAtom);
  const exchangeRate = useExchangeRateOfCurrency({ price: product.price });
  const formattedPrice = formatPriceWithCurrency({ price: exchangeRate, currency });

  const navigate = useNavigate();

  const handleClickProduct = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <ProductItem.Root key={product.id} onClick={() => handleClickProduct(product.id)}>
      <ProductItem.Image src={product.images[0]} alt={product.name} />
      <ProductItem.Info title={product.name} description={product.description} />
      <ProductItem.Meta>
        <ProductItem.MetaLeft>
          <ProductItem.Rating rating={product.rating} />
          <ProductItem.Price>{formattedPrice}</ProductItem.Price>
        </ProductItem.MetaLeft>
      </ProductItem.Meta>
      <Counter.Root>
        <Counter.Minus onClick={() => {}} disabled={true} />
        <Counter.Display value={1} />
        <Counter.Plus onClick={() => {}} />
      </Counter.Root>
    </ProductItem.Root>
  );
}

const productListQueryOptions = (category: Category): UseSuspenseQueryOptions<Product[], Error> => ({
  queryKey: ['productList'],
  queryFn: getProductList,
  select: data => data.filter((product: Product) => product.category === category || category === 'all'),
});

export default ProductListSection;
