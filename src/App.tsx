import { RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalProvider from './providers/GlobalProvider';
import router from './router';

const queryClient = new QueryClient();

function App() {
  return (
    <GlobalProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </GlobalProvider>
  );
}

export default App;
