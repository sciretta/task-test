import {useState,useEffect} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import {useDispatch,useStore} from 'Store'
import Alerts from './Alerts'
import useStyles from './MaterialStyles'


export default function NewTaskCard() {
  const classes = useStyles()

  const dispatch = useDispatch()
  const {user} = useStore()
  
  //estado que manejan el valor de los campos task y para
  const [task,setTask] = useState('')
  const [para,setPara] = useState('')
  useEffect(()=>{
  	setPara(user.username)
  },[user])

  //estados para el manejo de los errores
  const [success,setSuccess] = useState(false)
  const [error,setError] = useState(false)

  //funciones que actualizan el estado de cada campo
  const handleChangeTask = ({target}) => setTask(target.value)
  const handleChangePara = ({target}) => setPara(target.value)

  //funcion que maneja el evento de agregar una tarea y luego
  //la monta en el estado del usuario si este es el destinatario
  const handleAddTask = () =>{
    const token = localStorage.getItem("auth-token")
    if(task && para && token){
      fetch('/api/newtask',{
        method:'POST',
        body:JSON.stringify({task,para,de:user.username}),
        headers: {
          'Content-Type': 'application/json',
          'auth-token':token
        }
      })
      .then(res=>res.json())     
      .then(res=>{
        if(res.error){
          setError(true)
        }else{ 
          setSuccess(true)
          setTask('')
          setPara(user.username)
          
          if(user.username===res.data.todoCreate.para){
            dispatch({type:'ADD_TASK',newTask:res.data.todoCreate})
          }
        }
      })
      .catch(()=>setError(true))
    }
  } 

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <Grid container direction="column" justify="center" alignItems="center">
          <CardContent>
            <form noValidate autoComplete="off">
              <Grid container direction="column" justify="center" alignItems="center">
                <TextField 
                  value={task} 
                  onChange={handleChangeTask} 
                  label="Task"
                />
                <TextField 
                  value={para} 
                  onChange={handleChangePara} 
                  label="Para"
                />
              </Grid>
            </form>
          </CardContent>
          <CardActions>
            <Button 
              color="primary"
              className={classes.button}
              onClick={handleAddTask}
            >
              <Typography variant="body1">
                AGREGAR TAREA
              </Typography>
            </Button>
          </CardActions>
        </Grid>
      </Card>
      <Alerts 
        success={success} setSuccess={setSuccess}
        message={'Tu tarea ha sido enviada correctamente.'}
        error={error} setError={setError}
      />
    </>
  )
}