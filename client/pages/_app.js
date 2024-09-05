import { Toaster } from "@/components/ui/sonner";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import { ThemeProvider } from "@/ThemeProvider";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <Provider store={store}>
        <Component {...pageProps} />
        <Toaster />
      </Provider>
    </ThemeProvider>
  );
}
