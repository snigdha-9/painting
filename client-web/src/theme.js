import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints, mode } from '@chakra-ui/theme-tools';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false
};
const breakpoints = createBreakpoints({
  sm: '32em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em'
});

const colors = {
  gray: {
    100: '#EDF2F7',
    200: '#E2E8F0',
    400: '#A0AEC0',
    900: '#171923'
  }
};
const styles = {
  global: props => ({
    boxSizing: 'border-box',
    body: {
      bg: mode('gray.100', 'gray.900')(props)
    }
  })
};
const theme = extendTheme(
  {
    ...styles,
    ...colors,
    ...config,
    ...breakpoints
  },

  { fonts: { heading: 'Inter', body: 'Inter' } }
);

export default theme;
