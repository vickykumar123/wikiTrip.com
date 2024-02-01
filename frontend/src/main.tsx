import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {QueryClient, QueryClientProvider} from "react-query";
import {Provider} from "react-redux";
import {persistor, store} from "./store.ts";
import {PersistGate} from "redux-persist/integration/react";

import {AppContextProvider} from "./context/AppContext.tsx";
import {SearchContextProvider} from "./context/SearchContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContextProvider>
            <SearchContextProvider>
              <App />
            </SearchContextProvider>
          </AppContextProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
