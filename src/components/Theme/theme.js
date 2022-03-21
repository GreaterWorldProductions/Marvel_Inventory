import { createTheme } from '@material-ui/core';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#800000'
        },
        secondary: {
            main: '#151e3d'
        }
    },
    typography: {
        fontFamily: 'Quicksand',
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700
    }
})
