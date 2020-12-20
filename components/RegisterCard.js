import {useState} from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { useRouter } from 'next/router'
import Alerts from './Alerts'
import useStyles from './MaterialStyles'


export default function RegisterCard() {
  const classes = useStyles()
  const router = useRouter()

  //estados para el manejo de los errores
  const [success,setSuccess] = useState(false)
  const [error,setError] = useState(false)

  //funcion que maneja el evento de registro de usuario
  const handleRegister = () =>{
    const username = document.getElementById('register-username').value
    const password = document.getElementById('register-password').value
    const passwordCheck = document.getElementById('register-passwordCheck').value

    if(username && password===passwordCheck){
      fetch('/api/newuser',{
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
          setSuccess(true)

          router.replace("login")
        }
      })
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
                id="register-username" 
                variant="outlined"
                placeholder="Username"
              />
            </Grid>
            <Grid item>
              <TextField 
                id="register-password" 
                variant="outlined"
                placeholder="Password"
                type="password"
              />
            </Grid>
            <Grid item>
              <TextField 
                id="register-passwordCheck" 
                variant="outlined"
                placeholder="Confirm"
                type="password"
              />
            </Grid>
            <Grid item>
              <Button 
                variant="contained" 
                color="primary"
                disableElevation
                className={classes.button}
                onClick={handleRegister}
              >
                Registrar
              </Button>
            </Grid>
            <Grid item>
              <Button 
                variant="contained" 
                color="primary"
                disableElevation
                className={classes.button}
                onClick={()=>router.replace("login")}
              >
                Tienes cuenta?
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      <Alerts 
        success={success} setSuccess={setSuccess}
        message={'Usuario registrado.'} login
        error={error} setError={setError}
      />
    </>
  )
}

