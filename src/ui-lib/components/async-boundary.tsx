import { type UseSuspenseQueryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { type ReactNode, Suspense } from 'react';

type AsyncBoundaryProps<TQueryFnData = unknown, TError = Error, TData = TQueryFnData> = {
  /** Suspense fallback UI (로딩 중 표시할 컴포넌트) */
  fallback?: ReactNode;
  /** render props: 데이터를 받아서 렌더링 */
  children: (data: TData) => ReactNode;
} & Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'select'> & {
    select?: (data: TQueryFnData) => TData;
  };

/**
 * AsyncBoundary - 비동기 데이터 영역만 격리하여 Suspense 처리
 *
 * @example
 * ```tsx
 * <AsyncBoundary
 *   queryKey={['products']}
 *   queryFn={fetchProducts}
 *   fallback={<Skeleton />}
 * >
 *   {(products) => products.map(p => <Item key={p.id} {...p} />)}
 * </AsyncBoundary>
 * ```
 */
function AsyncBoundary<TQueryFnData = unknown, TError = Error, TData = TQueryFnData>({
  fallback,
  children,
  ...queryOptions
}: AsyncBoundaryProps<TQueryFnData, TError, TData>) {
  return (
    <Suspense fallback={fallback}>
      <AsyncBoundaryInner<TQueryFnData, TError, TData> {...queryOptions}>{children}</AsyncBoundaryInner>
    </Suspense>
  );
}

function AsyncBoundaryInner<TQueryFnData = unknown, TError = Error, TData = TQueryFnData>({
  children,
  ...queryOptions
}: Omit<AsyncBoundaryProps<TQueryFnData, TError, TData>, 'fallback'>) {
  const { data } = useSuspenseQuery(queryOptions as UseSuspenseQueryOptions<TQueryFnData, TError, TData>);
  return <>{children(data)}</>;
}

export default AsyncBoundary;
export type { AsyncBoundaryProps };
