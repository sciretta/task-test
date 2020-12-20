import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme=>({
	//HomeLayout
	appBar: {
    boxShadow:'none'
  },
  title:{
  	flexGrow:1
  },
  button:{
    width:100,
    height:30,
    background:theme.palette.background.paper,
    color:theme.palette.text.primary,
    marginLeft:15
  },
	//LoginLayout
  container:{
    background:theme.palette.background.body
  },
  gridContainer:{
    minHeight:'100vh'
  }

}))

export default useStyles