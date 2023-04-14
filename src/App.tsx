import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

type AppProps = {
  children: React.ReactNode;
};

const App = ({ children }: AppProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default App;
