// EXTERNAL IMPORTS
import React, { FunctionComponent, Fragment, memo } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

// SHARED IMPORTS
import { CHAKRA_THEME } from '@constants';
import { SocketManagerContextProvider } from '@contexts';
import { useEnforceHttps } from '@hooks';

// Component
const CustomApp: FunctionComponent<AppProps> = (props: AppProps) => {
  useEnforceHttps();

  return (
    <Fragment>
      <Head>
        <meta content='width=device-width, initial-scale=1.0' name='viewport' />
        <meta property='og:type' content='website' />
      </Head>
      <ChakraProvider theme={CHAKRA_THEME}>
        <SocketManagerContextProvider>
          <props.Component {...props.pageProps} />
        </SocketManagerContextProvider>
      </ChakraProvider>
    </Fragment>
  );
};

// Display Name
CustomApp.displayName = 'CustomApp';

export default memo(CustomApp);
