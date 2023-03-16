import { useEffect, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getFetch, httpBatchLink, loggerLink } from "@trpc/client";
import { trpc } from "./trpc";

function AppContent() {

  const registerUser = trpc.loginUser.useMutation()
  const getUser = trpc.getMe.useQuery()
  useEffect(() => {
    registerUser.mutate({
      email: "nabeegh08@gmail.com",
      password: "12345678@Nn"
    })
    // registerUser.mutate({
    //   name: "Nabeegh Ahmed",
    //   email: "nabeegh08@gmail.com",
    //   password: "12345678@Nn",
    //   passwordConfirm: "12345678@Nn",
    //   photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlysovRqSseA4uUGlio_vESy9xFc5OS7jXOva3NlE&s"
    // })
  }, [])

  return <div> {
    getUser.isLoading ? "Loading..." : getUser.data?.data.user?.name
  } </div>

}

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      })
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink(),
        httpBatchLink({
          url: "http://localhost:8000/api/trpc",
          fetch: async (input, init?) => {
            const fetch = getFetch();
            return fetch(input, {
              ...init,
              credentials: "include",
            });
          },
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
