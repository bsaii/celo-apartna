// import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { styletron } from '../styletron';
import MainLayout from '../layouts/MainLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyletronProvider value={styletron}>
      <BaseProvider theme={LightTheme}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default MyApp;
