import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

import { queryClient } from "../services/query";

import "react-tooltip/dist/react-tooltip.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />

      <ToastContainer position="bottom-right" />
    </QueryClientProvider>
  );
}

export default MyApp;
