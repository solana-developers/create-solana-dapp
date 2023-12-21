import { AppLayout } from './app-layout';
import { AppRoutes } from './app-routes';
import { ClusterProvider } from './cluster/cluster-data-access';
import { SolanaProvider } from './solana/solana-provider';

export function App() {
  return (
    <ClusterProvider>
      <SolanaProvider>
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </SolanaProvider>
    </ClusterProvider>
  );
}
