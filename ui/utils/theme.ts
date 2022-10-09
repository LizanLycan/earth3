import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    }
  }
})

const overrides: any = {
  MuiCard: {
    styleOverrides: {
      root: {
        position: 'relative',
        zIndex: 0,
        borderRadius: '24px'
      }
    }
  },
  MuiCardHeader: {
    defaultProps: {
      titleTypographyProps: { variant: 'h6' },
      subheaderTypographyProps: { variant: 'body2' }
    },
    styleOverrides: {
      root: {
        padding: theme.spacing(3, 3, 0)
      }
    }
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: theme.spacing(3)
      }
    }
  }
}

theme.components = overrides

export default theme
