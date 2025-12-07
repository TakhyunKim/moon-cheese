import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import BannerSection from './components/BannerSection';
import CurrentLevelSection from './components/CurrentLevelSection';
import ProductListSection from './components/ProductListSection';
import RecentPurchaseSection from './components/RecentPurchaseSection';

function HomePage() {
  return (
    <>
      <BannerSection />
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary fallback={<div>Error</div>}>
          <CurrentLevelSection />
        </ErrorBoundary>
      </Suspense>
      <RecentPurchaseSection />
      <ProductListSection />
    </>
  );
}

export default HomePage;
