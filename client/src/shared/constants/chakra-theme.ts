// EXTERNAL IMPORTS
import { extendTheme } from '@chakra-ui/react';
import { theme as defaultTheme, Theme } from '@chakra-ui/theme';
import { Styles, StyleFunctionProps } from '@chakra-ui/theme-tools';
import { ColorMode } from '@chakra-ui/color-mode';

// SHARED IMPORTS
import { COLOR, COLOR_MODE } from '@constants';

// Custom Styles
const customStyles: Styles = Object.freeze({
  ...defaultTheme.styles,
  global: (props: StyleFunctionProps) => ({
    ...defaultTheme.styles.global,
    html: {
      width: '100%',
      height: '100%'
    },
    body: {
      width: '100%',
      height: '100%',
      background: props.colorMode === COLOR_MODE.LIGHT ? COLOR.WHITE : COLOR.BLACK,
      color: props.colorMode === COLOR_MODE.LIGHT ? COLOR.BLACK : COLOR.WHITE,
      textRendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased'
    },
    '#__next': {
      width: '100%',
      height: '100%'
    }
  })
});

// Custom Theme
const customTheme: Theme = Object.freeze({
  ...defaultTheme,
  styles: { ...customStyles },
  config: {
    ...defaultTheme.config,
    initialColorMode: <ColorMode>COLOR_MODE.LIGHT,
    useSystemColorMode: false
  },
  fonts: {
    ...defaultTheme.fonts,
    heading: `'Roboto', ${defaultTheme.fonts.heading}`,
    body: `'Roboto', ${defaultTheme.fonts.body}`,
    mono: `'PT Mono', ${defaultTheme.fonts.mono}`
  },
  colors: {
    ...defaultTheme.colors,
    white: COLOR.WHITE,
    black: COLOR.BLACK
  },
  components: {
    ...defaultTheme.components,
    Drawer: {
      ...defaultTheme.components.Drawer,
      baseStyle: (props: StyleFunctionProps) => ({
        ...defaultTheme.components.Drawer.baseStyle(props),
        dialog: {
          background: props.colorMode === COLOR_MODE.LIGHT ? COLOR.WHITE : COLOR.BLACK,
          height: 'fit-content'
        }
      }),
      sizes: {
        ...defaultTheme.components.Drawer.sizes,
        xs: {
          ...defaultTheme.components.Drawer.sizes.xs,
          dialog: {
            ...defaultTheme.components.Drawer.sizes.xs.dialog,
            maxW: 'fit-content'
          }
        }
      }
    }
  }
});

const CHAKRA_THEME = extendTheme({ ...customTheme });

export default CHAKRA_THEME;
