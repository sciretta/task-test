import { createMuiTheme } from '@material-ui/core/styles'
import blueGrey from '@material-ui/core/colors/blueGrey'
import grey from '@material-ui/core/colors/grey'

export const theme = createMuiTheme({
  palette: {
  	primary:{
  		main:blueGrey[600],
      contrastText:grey[50]
  	},
    secondary:{
      contrastText:grey[50],
      main:grey[50]
    },
    background:{
      paper:blueGrey[800],
      default:grey[100]
    },
    text:{
      primary:grey[50],
      secondary:grey[100]
    }
  },
  typography: {
    h1:{
      fontSize:80,
      fontWeight:'bold'
    }
  }
})