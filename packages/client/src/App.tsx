import { useEffect, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getFetch, httpBatchLink, loggerLink } from "@trpc/client";
import { trpc } from "./trpc";

function AppContent() {
  const createRestaurant = trpc.createRestaurant.useMutation();


  const createRestaurantController = () => {
    createRestaurant.mutate({
      name: "Pearl Continental",
      username: "pearlcontinental2",
      description: "Hey"
    })
  }
  const registerUser = trpc.loginUser.useMutation()

  const rest = trpc.getRestaurant.useQuery({
    id: "64134e1b75b9fc446058b828"
  })

  const user = trpc.getMe.useQuery()

  useEffect(() => {
    
    // registerUser.mutate({
    //   name: "Nabeegh Ahmed",
    //   email: "nabeegh08@gmail.com",
    //   password: "12345678@Nn",
    //   passwordConfirm: "12345678@Nn",
    //   photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlysovRqSseA4uUGlio_vESy9xFc5OS7jXOva3NlE&s"
    // })
  }, [])

  return (
    <div>
      { createRestaurant.isLoading && <p>Loading...</p> }
      { createRestaurant.error && <p>{createRestaurant.error.message}</p> }
      { createRestaurant.isSuccess && createRestaurant.data.data.restaurant.name }
      {/* { JSON.stringify(rest.data?.data.restaurant) } */}
      { user.error?.message }
      { JSON.stringify(user.data?.data.user) }
      <button onClick={createRestaurantController}>Create Restaurant</button>
    </div>
  )

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
