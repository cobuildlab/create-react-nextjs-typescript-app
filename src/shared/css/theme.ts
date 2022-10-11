import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    drawer: {
      maxWidth: number;
    };
  }
}

export const theme = createTheme({
  mixins: {
    drawer: {
      maxWidth: 240,
    },
  },
});
