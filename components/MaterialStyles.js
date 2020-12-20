import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme=>({
  //NewTaskCard y TasksCards
  root: {
    minWidth: 300,
    maxWidth: 450,
    marginBottom:10
  },
  //LoginCard y RegisterCard
  card:{
    margin:'0px 10px 10px 10px'
  },
  button:{
    width:170,
    height:56,
    background:theme.palette.primary.main,
    color:'white'
  }
}))

export default useStyles
