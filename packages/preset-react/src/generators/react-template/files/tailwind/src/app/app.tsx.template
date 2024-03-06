import { AppRoutes } from './app-routes'
import { ClusterProvider } from './cluster/cluster-data-access'
import { SolanaProvider } from './solana/solana-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={client}>
      <ClusterProvider>
        <SolanaProvider>
          <AppRoutes />
        </SolanaProvider>
      </ClusterProvider>
    </QueryClientProvider>
  )
}
