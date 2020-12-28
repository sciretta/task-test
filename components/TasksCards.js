import {useState} from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import {useStore,useDispatch} from 'Store'
import Alerts from './Alerts'
import NewTaskCard from './NewTaskCard'
import useStyles from './MaterialStyles'

export default function TasksCards() {
  const {tasks,user} = useStore()
  
  return (
    <Grid 
      container direction="column"
      justify="center" alignItems="center"
    >
      {tasks && tasks.map(task=>(
        <Grid item key={task.id}>
          <TaskCard user={user} {...task}/>
        </Grid>
      ))}
      <NewTaskCard/>
    </Grid>
  )
}

function TaskCard(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [check,setCheck] = useState(props.checked)

  const [success,setSuccess] = useState(false)
  const [error,setError] = useState(false)

  const handleCheckTask = () =>{

    const token = localStorage.getItem("auth-token")
    fetch(`/api/checktask`,{
      method:'POST',
      body:JSON.stringify({checkId:props.id,check:!check}),
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
        dispatch({type:'CHECK_TASK',checkId:props.id,check:!check})
        setCheck(prevChecked=>!prevChecked)
      }
    })
    
    //CLOUD FUNCTION CON WEBHOOK
    
    // fetch(`https://api.8base.com/ckiteac3700cf07laecb7eh83/webhook/checktask`,{
    //   method:'POST',
    //   body:JSON.stringify({checkId:props.id,check:!check}),
    //   headers: {
    //     'Content-Type':'application/json'
    //   }
    // })
    // .then(res=>res.json())
    // .then(res=>{
    //   if(res.error){
    //     setError(true)
    //   }else{
    //     setSuccess(true)
    //     dispatch({type:'CHECK_TASK',checkId:props.id,check:!check})
    //     setCheck(prevChecked=>!prevChecked)
    //   }
    // })
    // .catch(err=>setError(true))
  }
  
  const handleDeleteTask = () =>{

    const token = localStorage.getItem("auth-token")
    fetch('/api/deletetask',{
      method:'POST',
      body:JSON.stringify({deleteId:props.id}),
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
        dispatch({type:"DELETE_TASK",deleteId:props.id})
      }
    })

  } 

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <CardContent>
              <Grid container direction="column" alignItems="center">
                <Grid item container justify="space-between">
                  <Typography variant="h5">
                    {props.task}
                  </Typography>
                  <Checkbox
                    checked={check}
                    onClick={handleCheckTask}
                    color="primary"
                  />
                </Grid>
                <Grid item container justify="space-between">
                  <Typography variant="body1">
                    {(props.user.username===props.de)?'de:mi':`de:${props.de}`}
                  </Typography>
                  <Typography variant="body1">
                    {props.createdAt.split('T')[0]}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
          <Grid item>
            <CardActions>
              <IconButton color="secondary" onClick={handleDeleteTask}>
                <DeleteIcon/>
              </IconButton>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
      <Alerts 
        success={success} setSuccess={setSuccess}
        message={'Cambio cargado correctamente.'}
        error={error} setError={setError}
      />
    </>
  )
}
