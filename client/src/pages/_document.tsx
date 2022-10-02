// EXTERNAL IMPORTS
import React from 'react';
import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/color-mode';
import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';

// SHARED IMPORTS
import { CHAKRA_THEME } from '@constants';

// Chakra UI FOUC Fix | https://griko.id/blog/prevent-fouc-on-next-js-chakra-ui
const emotionCache = createCache({ key: 'css' });
const { extractCritical } = createEmotionServer(emotionCache);

// Component
class CustomDocument extends Document {
  static displayName = 'CustomDocument';

  static async getInitialProps(context: DocumentContext) {
    const initialProps = await Document.getInitialProps(context);
    const styles = extractCritical(initialProps.html);
    return {
      ...initialProps,
      styles: [
        initialProps.styles,
        <style
          key='emotion-css'
          dangerouslySetInnerHTML={{ __html: styles.css }}
          data-emotion-css={styles.ids.join(' ')}
        />
      ]
    };
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet='UTF-8' />
          <meta content='ie-edge' httpEquiv='X-UA-Compatible' />
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
          <link
            href='https://fonts.googleapis.com/css2?family=PT+Mono&family=Roboto&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode={CHAKRA_THEME.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
