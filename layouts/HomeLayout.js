import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import CssBaseline from '@material-ui/core/CssBaseline'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Container from '@material-ui/core/Container'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'
import {useStore,useDispatch} from 'Store'
import useStyles from './MaterialStyles'

//esta funcion sirve para que el appbar(o navbar), se esconda cuando el usuario baja
function HideOnScroll(props) {
  const { children, window } = props
  const trigger = useScrollTrigger({ target: window ? window() : undefined })
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

//estructura principal de la pagina
export default function HomeLayout(props) {
  const {user} = useStore()
  const classes = useStyles()
  
  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography 
              className={classes.title}
              variant="h6"
            >
              Tasks App
            </Typography>
            {
              (user!=={})?
                <Logged user={user}/>:
                <NotLogged/>
            }
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar style={{marginBottom:10}}/>
      <Container>
        {props.children}
      </Container>
    </>
  )
}

//esta vista es para usuario que esta logeado
const Logged = ({user}) =>{
  const {replace} = useRouter()
  const classes = useStyles()
  const dispatch = useDispatch()

  //funcion que cierra sesion del usuario
  const handleLogOut = () =>{
    replace('/login')
    
    dispatch({type:'RESET_STATE'})
    localStorage.setItem("auth-token", "")
  }

  return (
    <>
      <Typography variant="h6">{user.username}</Typography>
      <Button color="primary" className={classes.button} onClick={handleLogOut}>
        <Typography variant="body1">Log Out</Typography>
      </Button>
    </>
  )
}
  
//esta vista es para usuarios que no estan logeados y entraron a la vista principal(redirect recomendable)
const NotLogged = () =>{
  const {replace} = useRouter()
  const classes = useStyles()

  //esta funcion envia al usuario a la pagina de inicio de sesion
  const handleLogIn = () =>{
    replace('/login')
  }

  return (
    <Button color="secondary" className={classes.button} onClick={handleLogOut}>
      <Typography variant="body1">Log In</Typography>
    </Button>
  )
}