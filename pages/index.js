import {useState} from 'react'
import HomeLayout from 'layouts/HomeLayout'
import NewTaskCard from 'components/NewTaskCard'
import TasksCards from 'components/TasksCards'
import Alerts from 'components/Alerts'
import useLogin from 'hooks/useLogin'

export default function Home() {
  //este error es para manejar el snackbar
	const [error,setError] = useState(false)
  //este hook verifica la informacion del usuario y carga sus datos
  useLogin(setError)
  return (
    <HomeLayout>
      <TasksCards/>
      <Alerts 
        success={false} setSuccess={()=>{}}
        message={null}	
        recargue
        error={error} setError={setError}
      />
    </HomeLayout>
  )
}
