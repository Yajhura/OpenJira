import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "../theme";
import { UIProvider } from "../src/context/UIContextBase";
import { Entryrovider } from "../src/context/EntryContextBase";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UIProvider>
      <Entryrovider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Entryrovider>
    </UIProvider>
  );
}

export default MyApp;
