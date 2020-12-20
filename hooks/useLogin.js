import { useEffect } from 'react'
import { useDispatch } from 'Store'

export default function useLogIn(setError){
	const dispatch = useDispatch()
	useEffect(() => {
    const exec = async() =>{
      //esta funcion valida el token del usuario
      await handleLoggedValidate(dispatch,setError)
      //esta funcion obtiene las tareas del usuario si la validacion fue correcta
      await handleGetUserTasks(dispatch,setError)
    }
    exec()
  }, [])
}

const handleGetUserTasks = async (dispatch,setError) =>{
  const token = localStorage.getItem("auth-token")

  if (token === null) {
    localStorage.setItem("auth-token", "")
    token = ""
  }else{
    try {
      fetch('/api/gettasks',{
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':token
        }
      })
      .then(res=>res.json())
      .then(res=>dispatch({type:'INITIAL_TASKS',tasks:res.data}))
      .catch(()=>setError(true))
    }catch (err){
      setError(true)
    }
  }
}


const handleLoggedValidate = async (dispatch,setError) => {
  const token = localStorage.getItem("auth-token")

  if (token === null) {
    localStorage.setItem("auth-token", "")
    token = ""
  }else{
    try {
      const tokenRes = await fetch('/api/validtoken', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':token
        }
      }) 
      .then(res =>res.json())

      if (!tokenRes.error) {
      	dispatch({type:'LOGIN_USER',user:{
      		id:tokenRes.data.id,
      		username:tokenRes.data.username
      	}})
      }else{
        setError(true)
      }
    } catch (err){
      setError(true)
    }
  }
}
