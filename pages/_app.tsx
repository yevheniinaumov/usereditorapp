import '../styles/globals.scss'
import {Provider} from 'react-redux';
import type {AppProps} from 'next/app'
import {store} from '../app/store';
import Layout from '../components/Layout';
import useMediaQuery from '@mui/material/useMediaQuery';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React from "react";

function App({Component, pageProps,}: AppProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
      () =>
          createTheme({
            palette: {
              mode: prefersDarkMode ? 'dark' : 'light',
            },
          }),
      [prefersDarkMode],
  );

  return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
  );
}

export default App;
