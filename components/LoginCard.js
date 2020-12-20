import {useState} from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { useRouter } from 'next/router'
import { useDispatch } from 'Store'
import Alerts from './Alerts'
import useStyles from './MaterialStyles'


export default function LoginCard() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const router = useRouter()
  
  //estados para el manejo de los errores
  const [success,setSuccess] = useState(false)
  const [error,setError] = useState(false)

  //funcion que maneja el evento de inicio de sesion
  const handleLogin = () =>{
    const username = document.getElementById('login-username').value
    const password = document.getElementById('login-password').value

    if(username && !password<5){
      fetch('/api/getuser',{
        method:'POST',
        body:JSON.stringify({username,password}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res=>res.json())
      .then(res=>{
        if(res.error){
          setError(true)
        }else{
          localStorage.setItem("auth-token",res.data.token)

          setSuccess(true)

          dispatch({type:'LOGIN_USER',user:{
            id:res.data.id,
            username:res.data.username
          }})
          
          router.replace("/")
        }
      })
      .catch(err=>console.error(err))
    }
  }

  return (
    <>
      <Card className={classes.card}>
        <CardActions>
          <Grid 
            container
            justify="space-around"
            alignItems="center"
            direction="column"
            spacing={1}
          >
            <Grid item>
              <TextField 
                id="login-username" 
                variant="outlined"
                placeholder="Username"
              />
            </Grid>
            <Grid item>
              <TextField 
                id="login-password" 
                variant="outlined"
                placeholder="Password"
                type="password"
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained" 
                color="primary"
                disableElevation
                className={classes.button}
                onClick={handleLogin}
              >
                Iniciar Sesion
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                className={classes.button}
                onClick={()=>router.replace("register")}
              >
                Nuevo Usuario
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      <Alerts 
        success={success} setSuccess={setSuccess}
        message={'Iniciando sesion.'} login
        error={error} setError={setError}
      />
    </>
  )
}
